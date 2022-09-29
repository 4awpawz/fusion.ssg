/**
 * composeWithoutTemplate - Compose without a template asset.
 */

// import { ignoreTokens } from "./ignoreTokens.js";
// import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";
import { composeIncludes } from "./composeIncludes.js";
import { composeTokens } from "./composeTokens.js";

export const composeWithoutTemplate = function(asset: Asset, assets: Assets): Asset {
    // Resolve includes.
    asset = composeIncludes(asset, assets);
    // Resolve front matter tokens.
    asset.content = composeTokens(asset.content, asset.fm.data);
    return asset;
};
