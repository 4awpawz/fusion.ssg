/**
 * Compose - Compose pages.
 */

import { composeHTMLDocument } from "./composeHTMLDocument.js";
import type { Assets } from "../../../../types/types.js";
import * as metrics from "../../../lib/metrics.js";

export const compose = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("composition");
    for (const _asset of assets) {
        if (_asset.assetType !== "template") continue;
        await composeHTMLDocument(_asset, assets);
    }
    metrics.stopTimer("composition");
    return assets;
};
