/**
 * Saves generated content to file.
 */

import path from "path";
import { _remove } from "../lib/io/_remove.js";
import { _outputFile } from "../lib/io/_outputFile.js";
import { _filter } from "../lib/functional.js";
import { config } from "./configuration/config.js";

export const serialize = async function(assets: Assets): Promise<Assets> {
    const buildFolder = config.projectStructure.buildFolder;
    const buildPath = path.join(process.cwd(), buildFolder);
    _remove(buildFolder);
    const pageAssets: Assets = _filter(assets, asset => asset.assetType === "page");
    for (let i = 0; i < pageAssets.length; i++) {
        const asset = pageAssets[i] as Asset;
        const outputPath = path.join(buildPath, asset.htmlDocumentName as string);
        try {
            await _outputFile(outputPath, asset.content);
        } catch (error) {
            console.error(`there was an error: unable to writing asset ${outputPath} to file.`);
        }
    }
    return assets;
};
