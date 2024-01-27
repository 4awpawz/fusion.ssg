/**
 * serializePage - Serializes every template's content except for those that are
 * collection generators and returns the total number of pages serialized.
 */

import { join } from "path";
import { _writeContentToFile } from "../../lib/io/_writeContentToFile.js";
import { _filter } from "../../lib/functional.js";
import type { Assets } from "../../../types/types";
import js_beautify from "js-beautify";

export const serializeHTMLDocuments = async function(assets: Assets, buildFolderPath: string): Promise<number> {
    const templateAssets = _filter(assets, asset => asset.assetType === "template" && !asset.isCollection);
    let count = 0;
    for (const asset of templateAssets) {
        if (typeof asset.content === "undefined") continue;
        const outputPath = join(buildFolderPath, asset.htmlDocumentName as string);
        const beautifiedHTML = js_beautify.html(asset.content, { "preserve_newlines": false });
        await _writeContentToFile(outputPath, beautifiedHTML);
        count++;
    }
    return count;
};

export const serializeCSSDocuments = async function(assets: Assets, buildFolderPath: string): Promise<void> {
    const cssAssets = _filter(assets, asset => asset.assetType === "css");
    for (const asset of cssAssets) {
        if (typeof asset.content === "undefined") continue;
        const outputPath = join(buildFolderPath, asset.cssDocumentName as string);
        const beautifiedCSS = js_beautify.css(asset.content, { "preserve_newlines": false });
        await _writeContentToFile(outputPath, beautifiedCSS);
    }
};
