/**
 * Compose - Compose pages.
 */

import { composeWithoutPage } from "./composeWithoutPage.js";
import { composeWithPage } from "./composeWithPage.js";
import type { Assets } from "../../../../types/types";
import * as metrics from "../../../lib/metrics.js";

export const compose = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("composition");
    for (const _asset of assets) {
        if (_asset.assetType !== "template") continue;
        _asset.associatedPage === "" ? await composeWithoutPage(_asset, assets) : await composeWithPage(_asset, assets);
    }
    metrics.stopTimer("composition");
    return assets;
};
