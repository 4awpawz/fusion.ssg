/**
 * findAndReplaceTokenContent - find a token and  replace its content.
 */

import type { Token } from "../../types/types.js";

const regexpBuilder = function(token: string): RegExp {
    // This regex ignores script and code tags to guard against applying tokens to their content.
    const r = `${token}(?![<]*>|[^<>]*</(?:script|code)>)`;
    return new RegExp(r, "g");
};

export const findAndReplaceTokenContent = function(content: string, token: Token | string, value: string): string {
    const regex = regexpBuilder(token);
    return content.replaceAll(regex, value);
};
