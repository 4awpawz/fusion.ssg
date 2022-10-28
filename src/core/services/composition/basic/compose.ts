/**
 * Compose - Compose pages using CategorizedPages.
 */

import { composeWithoutTemplate } from "./composeWithoutTemplate.js";
import { composeWithTemplate as composeWithTemplate } from "./composeWithTemplate.js";
import type { Assets } from "../../../../types/types";

export const compose = async function(assets: Assets): Promise<Assets> {
    for (const _asset of assets) {
        if (_asset.assetType !== "template") continue;
        _asset.associatedPage === "" ? await composeWithoutTemplate(_asset, assets) : await composeWithTemplate(_asset, assets);
    }
    return assets;
};
