/**
 * getAssets - Creates an asset for each file found in user's config.src
 * folder. An asset is any file that participates in page compostion.
 * Resolves to an array of assets.
 */

import { join, parse } from "path";
import matter from "gray-matter";
import { markdownToHTML } from "../../lib/markdownToHTML.js";
import { _readFile } from "../../lib/io/_readFile.js";
import { fileModifiedTime } from "../../lib/io/fileModifiedTime.js";
import { getFiles } from "./getFiles.js";
import { getAssetType } from "./getAssetType.js";
import type { Asset, Assets } from "../../../types/types";
import * as metrics from "../../lib/metrics.js";

export const discover = async function(): Promise<Assets> {
    metrics.startTimer("discovery");
    const pathsToAssets = await getFiles();
    const assets = await Promise.all(pathsToAssets.map(async (assetPath: string) => {
        const fileInfo = parse(assetPath);
        const filePath = assetPath;
        const fileType = fileInfo.ext;
        const timestamp = await fileModifiedTime(assetPath);
        const assetType = getAssetType(assetPath);
        const fileName = fileInfo.name;
        const asset: Asset = {
            timestamp,
            assetType,
            filePath,
            fileType,
        };
        // Assets that represent data files do not include their content.
        if (["data", "component"].includes(assetType)) return asset;
        const buffer = await _readFile(assetPath);
        if (typeof buffer === "undefined") return asset;
        asset.fm = matter(buffer, { excerpt: true });
        asset.content = fileType === ".md" ? markdownToHTML(asset.fm.content) : asset.fm.content;
        if (asset.assetType !== "template") return asset;
        const page: string | undefined = asset.fm.data["page"];
        asset.associatedPage = (typeof page === "string" && page.length !== 0) && `src/pages/${page}.html` || "";
        const oPath = fileInfo.dir.split("/").slice(2).join("/"); // removes 'src/' and the parent folder containing templates.
        const oName = fileName.endsWith("index") ? "index.html" : fileName + "/index.html";
        asset.htmlDocumentName = join(oPath, oName);
        return asset;
    }));
    metrics.stopTimer("discovery");
    return assets;
};
