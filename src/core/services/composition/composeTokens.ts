/**
 * composeTokens - Applies named values found in front matter to like-named tokens found in an asset's content.
 */

import { ignoreTokens } from "./ignoreTokens.js";
import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";

export const composeTokens = function(assetContent: string, fmData: object): string {
    for (const [key, value] of Object.entries(fmData)) {
        // Ignore reserved token names.
        if (!ignoreTokens.includes(key)) {
            // Resolve marker.
            assetContent = markerFindAndReplaceContent(assetContent, key, value as string);
        }
    }
    return assetContent;
};
