/**
 * serializePage - Serializes every template's content except for those that are
 * collection generators and returns the total number of pages serialized.
 */

import { join } from "path";
import { _writeContentToFile } from "../../lib/io/_writeContentToFile.js";
import { _filter } from "../../lib/functional.js";
import type { Assets } from "../../../types/types";
import js_beautify from "js-beautify";

export const serializePages = async function(assets: Assets, buildFolderPath: string): Promise<number> {
    const templateAssets = _filter(assets, asset => asset.assetType === "template" && !asset.fm?.data["isCollection"]);
    let count = 0;
    for (const asset of templateAssets) {
        const outputPath = join(buildFolderPath, asset.htmlDocumentName as string);
        if (typeof asset.content === "undefined") continue;
        const beautifiedHTML = js_beautify.html(asset.content, { "preserve_newlines": false });
        await _writeContentToFile(outputPath, beautifiedHTML);
        count++;
    }
    return count;
};
