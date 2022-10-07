/**
 * Compose - Compose pages using CategorizedPages.
 */

// import path from "path";
import { composeWithoutTemplate } from "./composeWithoutTemplate.js";
import { composeWithTemplate } from "./composeWithTemplate.js";

export const compose = function(assets: Assets): Assets {
    for (const _asset of assets) {
        if (_asset.assetType !== "page") continue;
        _asset.associatedTemplate === "" ? composeWithoutTemplate(_asset, assets) : composeWithTemplate(_asset, assets);
    }
    return assets;
};
