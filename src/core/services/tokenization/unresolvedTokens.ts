/**
 * unresolvedTokens - Notes and reports all unresolved tokens per HTML document.
 */

import type { UnresolvedToken } from "../../../types/types";
import chalk from "chalk";
import { _forEach } from "../../lib/functional.js";

const unresolvedTokens: UnresolvedToken[] = [];

/**
 * Important: Removes code and script tags from content before searching for
 * unresolved tokens because these can have their own token-like content e.g. {...}.
 */
const searchContent = function(content: string) {
    // Regular expression to match code tags
    const codeTagRegex = /<code\b[^<]*(?:(?!<\/code>)<[^<]*)*<\/code>/gi;
    // Remove content within code tags from the HTML
    const contentWithoutCodeTags = content.replace(codeTagRegex, '');
    // Regular expression to match script tags
    const scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    // Remove content within script tags from the HTML
    const contentWithoutCodeAndScriptTags = contentWithoutCodeTags.replace(scriptTagRegex, '');
    // Array to store the matches
    const matches: string[] = [];
    // Regular expression to match text between opening and closing braces
    const regex = /{+([^}]*)}+/g;
    // Iterate through the matches and extract the content inside braces
    let match;
    while ((match = regex.exec(contentWithoutCodeAndScriptTags)) !== null) {
        // Validate token to guard against things like empty token with no name or with just one or mre spaces.
        const length = match[1]?.trim().length;
        if (length && length > 0) matches.push(match[0]);
    }
    return matches;
};

const addUnresolvedTokens = function(tokens: string[], file: string): void {
    _forEach(tokens, function(token) {
        unresolvedTokens.push({ token, file });
    });
};

export const report = function(): void {
    if (!unresolvedTokens.length) return;
    console.log(chalk.black.bgYellow("Warning! The following HTML documents contain unresolved tokens:"));
    _forEach(unresolvedTokens, function(unresolvedToken) {
        console.log(chalk.black.bgYellow(`  file: ${unresolvedToken.file}, token: ${unresolvedToken.token}`));
    });
};

export const note = function(assetContent: string, file: string): void {
    const _assetContent = assetContent.slice(0);
    const matches = searchContent(_assetContent);
    if (matches === null) return;
    addUnresolvedTokens([...matches], file);
};
