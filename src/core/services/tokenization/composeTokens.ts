/**
 * composeTokens - Applies template front matter tokens and user config's base URL to content.
 */

import type { Tokens } from "../../../types/types";
import { findAndReplaceTokenContent } from "../../lib/findAndReplaceTokenContent.js";

export const composeTokens = function(assetContent: string, tokens: Tokens): string {
    for (const [key, value] of Object.entries(tokens)) {
        assetContent = findAndReplaceTokenContent(assetContent, `{${key}}`, value as string);
    }
    return assetContent;
};
