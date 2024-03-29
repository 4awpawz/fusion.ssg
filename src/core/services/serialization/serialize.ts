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

const getBuildFolderPath = function(): string {
    const baseURL = config.userConfig.baseURL;
    let buildFolderPath = join(process.cwd(), config.buildFolder);
    buildFolderPath = process.env["BUILD_STRATEGY"] === "RELEASE" ? join(buildFolderPath, baseURL) : buildFolderPath;
    return buildFolderPath;
};

export const serialize = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("serialization");
    const buildFolderPath = getBuildFolderPath();
    const count = await serializePages(assets, buildFolderPath);
    console.log("total documents generated: ", chalk.green(count));
    await serializeOtherAssets(assets, buildFolderPath);
    metrics.stopTimer("serialization");
    return assets;
};
