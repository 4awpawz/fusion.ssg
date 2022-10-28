/**
 * Saves generated content to file.
 */

import path from "path";
import { _remove } from "../lib/io/_remove.js";
import { _outputFile } from "../lib/io/_outputFile.js";
import { _filter } from "../lib/functional.js";
import { getConfiguration } from "./configuration/getConfiguration.js";
import type { Asset, Assets } from "../../types/types";

/**
 * Serialize pages.
 */

const serializePages = async function(assets: Assets) {
    const buildFolder = (await getConfiguration()).projectStructure.buildFolder;
    const buildPath = path.join(process.cwd(), buildFolder);
    _remove(buildFolder);
    const templateAssets: Assets = _filter(assets, asset => asset.assetType === "template");
    for (let i = 0; i < templateAssets.length; i++) {
        const asset = templateAssets[i] as Asset;
        const outputPath = path.join(buildPath, asset.htmlDocumentName as string);
        try {
            await _outputFile(outputPath, asset.content);
        } catch (error) {
            console.error(`there was an error: unable to write asset ${outputPath} to file.`);
        }
    }
};

/**
 * Serialize assets as JSON.
 */

const serializeAssets = function(assets: Assets) {
    const assetsAsJSONString = JSON.stringify(assets);
    const outputPath = path.join(process.cwd(), "assets.json");
    try {
        _outputFile(outputPath, assetsAsJSONString);
    } catch (error) {
        console.error(`there was an error: unable to write assets ${outputPath} to file.`);
    }
};

export const serialize = async function(assets: Assets): Promise<Assets> {
    await serializePages(assets);
    serializeAssets(assets);
    return assets;
};
