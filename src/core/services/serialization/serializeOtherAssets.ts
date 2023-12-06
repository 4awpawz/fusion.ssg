/**
 * serializeAssets - Serializes other assets.
 */

import path from "path";
import { _writeJSONFile } from "../../lib/io/_writeJSONFile.js";
import { _copyFolder } from "../../lib/io/_copyFolder.js";
import { config } from "../configuration/configuration.js";
import type { Assets, Configuration } from "../../../types/types";
import { _fileExists } from "../../lib/io/_fileExists.js";
import { _glob } from "../../lib/io/_glob.js";
import { _copyFile } from "../../lib/io/_copyFile.js";

const serializeAssetsJSON = async function(assets: Assets): Promise<void> {
    const outputPath = path.join(process.cwd(), ".assets.json");
    await _writeJSONFile(outputPath, assets, { spaces: 2 }); return;
};

// The src/css/libs folder is reserved for 3rd party libraries.
// Project specific css files are true assets and are not coppied here.
const serializeCSSFolder = async function(config: Configuration, buildFolderPath: string): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.cssFolder, config.cssLibsFolder);
    if (!_fileExists(sourceFolder)) return;
    const destinationFolder = path.join(buildFolderPath, config.cssFolder, config.cssLibsFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

const serializeScriptsFolder = async function(config: Configuration, buildFolderPath: string): Promise<void> {
    // Note: we can't just copy the src/scripts folder in whole because it might contain
    // .ts files (see compilation) which would pollute the build/scripts folder.
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.scriptsFolder);
    if (!_fileExists(sourceFolder)) return;
    const filePahts = await _glob(path.join(sourceFolder, "/**/*.js"));
    for (const filePath of filePahts) {
        const filePathParts = filePath.split("scripts");
        const destPath = path.join(buildFolderPath, config.scriptsFolder, filePathParts[1] as string);
        await _copyFile(filePath, destPath);
    }
    return;
};

const serializeMediaFolder = async function(config: Configuration, buildFolderPath: string): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.mediaFolder);
    if (!_fileExists(sourceFolder)) return;
    const destinationFolder = path.join(buildFolderPath, config.mediaFolder);
    await _copyFolder(sourceFolder, destinationFolder);
    return;
};

const serializeEtcFolder = async function(config: Configuration, buildFolderPath: string): Promise<void> {
    const sourceFolder = path.join(process.cwd(), config.srcFolder, config.etcFolder);
    if (!_fileExists(sourceFolder)) return;
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
