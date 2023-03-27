/**
 * serializePage - Serialize every template's content except for those that are
* collection generators and return the total number of pages serialized.
 */

import { join } from "path";
import { _writeContentToFile } from "../../lib/io/_writeContentToFile.js";
import { _filter } from "../../lib/functional.js";
import { getConfiguration } from "./../configuration/getConfiguration.js";
import type { Assets } from "../../../types/types";
import { _remove } from "../../lib/io/_remove.js";

export const serializePages = async function(assets: Assets): Promise<{ count: number, wips: number }> {
    const buildFolderPath = join(process.cwd(), (await getConfiguration()).buildFolder);
    _remove(buildFolderPath);
    let templateAssets = _filter(assets, asset => asset.assetType === "template" && !asset.fm?.data["isCollection"]);
    const unfilteredCount = templateAssets.length;
    const buildStrategy = process.env["BUILD_STRATEGY"];
    templateAssets = buildStrategy === "RELEASE" ? _filter(templateAssets, asset => !asset.isWip) : templateAssets;
    let count = 0;
    for (const asset of templateAssets) {
        const outputPath = join(buildFolderPath, asset.htmlDocumentName as string);
        if (typeof asset.content === "undefined") continue;
        await _writeContentToFile(outputPath, asset.content);
        count++;
    }
    const wips = unfilteredCount - count;
    const result = { count, wips };
    return result;
};
