/**
 * Compose - Compose pages using CategorizedPages.
 */

import { composeWithoutTemplate } from "./composeWithoutTemplate.js";
import { composeWithTemplate } from "./composeWithTemplate.js";

export const compose = async function(assets: Assets): Promise<Assets> {
    for (const _asset of assets) {
        if (_asset.assetType !== "page") continue;
        _asset.associatedTemplate === "" ? await composeWithoutTemplate(_asset, assets) : await composeWithTemplate(_asset, assets);
    }
    return assets;
};
