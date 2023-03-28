/**
 * composeTokens - Applies template front matter tokens and user config's base URL to content.
 */

import type { Tokens } from "../../../../types/types";
import { findAndReplaceTokenContent } from "../../../lib/findAndReplaceTokenContent.js";
import { getConfiguration } from "../../configuration/getConfiguration.js";

const getUerConfigBaseURL = async function(): Promise<string | undefined> {
    return (await getConfiguration()).userConfig.baseURL;
};

export const composeTokens = async function(assetContent: string, tokens: Tokens): Promise<string> {
    const baseURL = process.env["BUILD_STRATEGY"] === "DEVELOPMENT" ? "" : await getUerConfigBaseURL();
    const _tokens = typeof baseURL !== "undefined" ? { ...tokens, baseURL } : tokens;
    for (const [key, value] of Object.entries(_tokens)) {
        assetContent = findAndReplaceTokenContent(assetContent, `{${key}}`, value as string);
    }
    return assetContent;
};
