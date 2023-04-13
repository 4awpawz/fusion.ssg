/**
 * serialize - Serializes pages, assets, css, scripts, media, etc to the build folder.
 */

import type { Assets } from "../../../types/types";
import * as metrics from "../../lib/metrics.js";
import { serializePages } from "./serializePages.js";
import { serializeOtherAssets } from "./serializeOtherAssets.js";
import chalk from "chalk";
import { config } from "../configuration/configuration.js";
import { join } from "path";
import { _remove } from "../../lib/io/_remove.js";

const getBuildFolderPath = async function(): Promise<string> {
    const baseURL = config.userConfig.baseURL;
    let buildFolderPath = join(process.cwd(), config.buildFolder);
    buildFolderPath = process.env["BUILD_STRATEGY"] === "RELEASE" ? join(buildFolderPath, baseURL) : buildFolderPath;
    return buildFolderPath;
};

export const serialize = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("serialization");
    await _remove(config.buildFolder);
    const buildFolderPath = await getBuildFolderPath();
    const result = await serializePages(assets, buildFolderPath);
    "RELEASE" === process.env["BUILD_STRATEGY"] &&
        console.log("total WIP documents bypassed: ", chalk.green(result.wips));
    console.log("total documents generated: ", chalk.green(result.count));
    await serializeOtherAssets(assets, buildFolderPath);
    metrics.stopTimer("serialization");
    return assets;
};
