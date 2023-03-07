/**
 * serializeAssets - Serialize assets to assets.json.
 */

import path from "path";
import { _writeJSONFile } from "../../lib/io/_writeJSONFile.js";
import { _copyFolder } from "../../lib/io/_copyFolder.js";
import { getConfiguration } from "../configuration/getConfiguration.js";
import type { Assets, Configuration } from "../../../types/types";

const serializeAssetsJSON = async function(assets: Assets): Promise<void> {
    const outputPath = path.join(process.cwd(), "assets.json");
    await _writeJSONFile(outputPath, assets);
    return;
};

const serializeCSSFolder = async function(config: Configuration): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.cssFolder);
    const destinationFolder = path.join(process.cwd(), config.buildFolder, config.cssFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

const serializeScriptsFolder = async function(config: Configuration): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.scriptsFolder);
    const destinationFolder = path.join(process.cwd(), config.buildFolder, config.scriptsFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

const serializeMediaFolder = async function(config: Configuration): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.mediaFolder);
    const destinationFolder = path.join(process.cwd(), config.buildFolder, config.mediaFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

const serializeEtcFolder = async function(config: Configuration): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.etcFolder);
    const destinationFolder = path.join(process.cwd(), config.buildFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

export const serializeOtherAssets = async function(assets: Assets): Promise<void> {
    await serializeAssetsJSON(assets);
    const config = await getConfiguration();
    await serializeCSSFolder(config);
    await serializeScriptsFolder(config);
    await serializeMediaFolder(config);
    await serializeEtcFolder(config);
    return;
};
