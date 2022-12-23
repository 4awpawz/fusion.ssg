/**
 * composeTokens - Applies named values found in front matter to like-named tokens found in an asset's content.
 */

import { findAndReplaceTokenContent } from "../../../lib/findAndReplaceTokenContent.js";

export const composeTokens = function(assetContent: string, fmData: object): string {
    for (const [key, value] of Object.entries(fmData)) {
        assetContent = findAndReplaceTokenContent(assetContent, `{${key}}`, value as string);
    }
    return assetContent;
};
