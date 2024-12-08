/**
 * serialize - Serializes pages, assets, css, scripts, media, etc to the build folder.
 */

import type { Assets } from "../../../types/types.js";
import * as metrics from "../../lib/metrics.js";
import { serializeHTMLDocuments, serializeCSSDocuments } from "./serializeHTMLAndCSSDocuments.js";
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
    const pageCount = await serializeHTMLDocuments(assets, buildFolderPath);
    console.log("total html documents generated: ", chalk.green(pageCount));
    await serializeCSSDocuments(assets, buildFolderPath);
    await serializeOtherAssets(assets, buildFolderPath);
    metrics.stopTimer("serialization");
    return assets;
};
