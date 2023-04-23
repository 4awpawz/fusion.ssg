/**
 * serializeAssets - Serialize assets to assets.json.
 */

import path from "path";
import { _writeJSONFile } from "../../lib/io/_writeJSONFile.js";
import { _copyFolder } from "../../lib/io/_copyFolder.js";
import { config } from "../configuration/configuration.js";
import type { Assets, Configuration } from "../../../types/types";

const serializeAssetsJSON = async function(assets: Assets): Promise<void> {
    const outputPath = path.join(process.cwd(), "assets.json");
    await _writeJSONFile(outputPath, assets, { spaces: 2 }); return;
};

const serializeCSSFolder = async function(config: Configuration, buildFolderPath: string): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.cssFolder);
    const destinationFolder = path.join(buildFolderPath, config.cssFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

const serializeScriptsFolder = async function(config: Configuration, buildFolderPath: string): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.scriptsFolder);
    const destinationFolder = path.join(buildFolderPath, config.scriptsFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

const serializeMediaFolder = async function(config: Configuration, buildFolderPath: string): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.mediaFolder);
    const destinationFolder = path.join(buildFolderPath, config.mediaFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

const serializeEtcFolder = async function(config: Configuration, buildFolderPath: string): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.etcFolder);
    const destinationFolder = path.join(buildFolderPath);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

export const serializeOtherAssets = async function(assets: Assets, buildFolderPath: string): Promise<void> {
    await serializeAssetsJSON(assets);
    await serializeCSSFolder(config, buildFolderPath);
    await serializeScriptsFolder(config, buildFolderPath);
    await serializeMediaFolder(config, buildFolderPath);
    await serializeEtcFolder(config, buildFolderPath);
    return;
};
