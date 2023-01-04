/**
 * composeTokens - Applies named values found in a datat source and
* in front matter to like-named tokens found in an asset's content.
 */

import type { Tokens } from "../../../../types/types.js";
import { findAndReplaceTokenContent } from "../../../lib/findAndReplaceTokenContent.js";

export const composeTokens = function(assetContent: string, fmData: object): string {
    const tokens = (fmData as Tokens)["tokens"];
    if (typeof tokens === "undefined") return assetContent;
    for (const [key, value] of Object.entries(tokens)) {
        assetContent = findAndReplaceTokenContent(assetContent, `{${key}}`, value as string);
    }
    return assetContent;
};
