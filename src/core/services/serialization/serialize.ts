/**
 * serialize - Serializes pages, assets, css, scripts, media, etc to the build folder.
 */

import type { Assets } from "../../../types/types";
import * as metrics from "../../lib/metrics.js";
import { serializePages } from "./serializePages.js";
import { serializeOtherAssets } from "./serializeOtherAssets.js";
import chalk from "chalk";

export const serialize = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("serialization");
    const result = await serializePages(assets);
    "RELEASE" === process.env["BUILD_STRATEGY"] &&
        console.log("total WIP documents bypassed: ", chalk.green(result.wips));
    console.log("total documents generated: ", chalk.green(result.count));
    await serializeOtherAssets(assets);
    metrics.stopTimer("serialization");
    return assets;
};
