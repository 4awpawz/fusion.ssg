/**
 * Saves generated content to file.
 */

import path from "path";
import { _remove } from "../lib/io/_remove.js";
import { _outputFile } from "../lib/io/_outputFile.js";
import { _writeJson } from "../lib/io/_writeJson.js";
import { _filter } from "../lib/functional.js";
import { getConfiguration } from "./configuration/getConfiguration.js";
import type { Asset, Assets } from "../../types/types";

/**
 * Serialize pages.
 */

const serializePages = async function(assets: Assets) {
    const buildFolder = (await getConfiguration()).buildFolder;
    const buildPath = path.join(process.cwd(), buildFolder);
    _remove(buildFolder);
    const templateAssets: Assets = _filter(assets, asset => asset.assetType === "template");
    for (let i = 0; i < templateAssets.length; i++) {
        const asset = templateAssets[i] as Asset;
        const outputPath = path.join(buildPath, asset.htmlDocumentName as string);
        await _outputFile(outputPath, asset.content);
    }
};

/**
 * Serialize assets as JSON.
 */

const serializeAssets = async function(assets: Assets) {
    const outputPath = path.join(process.cwd(), "assets.json");
    await _writeJson(outputPath, assets);
};

export const serialize = async function(assets: Assets): Promise<Assets> {
    await serializePages(assets);
    await serializeAssets(assets);
    return assets;
};
