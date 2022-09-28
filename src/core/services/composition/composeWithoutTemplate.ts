import { ignoreTokens } from "./ignoreTokens.js";
import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";
import { composeIncludes } from "../composition/composeIncludes.js";

export const composeWithoutTemplate = function(asset: Asset, assets: Assets): Asset {
    // Resolve includes.
    asset = composeIncludes(asset, assets);
    // replace markers
    for (const [key, value] of Object.entries(asset.fm.data)) {
        if (!ignoreTokens.includes(key)) {
            // Resolve markers.
            asset.content = markerFindAndReplaceContent(asset.content, key, value as string);
        }
    }
    return asset;
};
