/**
 * Compose - Compose pages using CategorizedPages.
 */

import { composeWithoutPage } from "./composeWithoutPage.js";
import { composeWithPage } from "./composeWithPage.js";
import type { Assets } from "../../../../types/types";

export const compose = async function(assets: Assets): Promise<Assets> {
    for (const _asset of assets) {
        if (_asset.assetType !== "template") continue;
        _asset.associatedPage === "" ? await composeWithoutPage(_asset, assets) : await composeWithPage(_asset, assets);
    }
    return assets;
};
