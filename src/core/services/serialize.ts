/**
 * Saves generated content to file.
 */

import path from "path";
import { _remove } from "../lib/io/_remove.js";
import { _outputFile } from "../lib/io/_outputFile.js";
import { _writeJSONFile } from "../lib/io/_writeJSONFile.js";
import { _filter } from "../lib/functional.js";
import { getConfiguration } from "./configuration/getConfiguration.js";
import type { Assets } from "../../types/types";
import * as metrics from "../lib/metrics.js";

/**
 * Serialize every template's content except for those that are
* collection generators and return the total number of pages serialized.
 */

const serializePages = async function(assets: Assets): Promise<number> {
    const buildFolder = (await getConfiguration()).buildFolder;
    const buildFolderPath = path.join(process.cwd(), buildFolder);
    _remove(buildFolder);
    const templateAssets: Assets = _filter(assets, asset => asset.assetType === "template" && !asset.fm?.data["isCollection"]);
    let count = 0;
    for (const asset of templateAssets) {
        const outputPath = path.join(buildFolderPath, asset.htmlDocumentName as string);
        if (typeof asset.content === "undefined") continue;
        await _outputFile(outputPath, asset.content);
        count++;
    }
    return count;
};

/**
 * Serialize assets to assets.json.
 */

const serializeAssets = async function(assets: Assets): Promise<void> {
    const outputPath = path.join(process.cwd(), "assets.json");
    await _writeJSONFile(outputPath, assets);
    return;
};

export const serialize = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("serialization");
    const count = await serializePages(assets);
    console.log("total pages generated: ", count);
    await serializeAssets(assets);
    metrics.stopTimer("serialization");
    return assets;
};
