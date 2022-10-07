/**
 * getFileAssets - Creates an assets for each file found in user's
 * src folder. An asset is any file that participates in page compostion.
 * Resolves to an array of assets.
 */

import { join, parse } from "path";
import matter from "gray-matter";
import { markdownToHTML } from "../../lib/markdownToHTML.js";
import { _readFile } from "../../lib/io/_readFile.js";
import { getFiles } from "./getFiles.js";
import { getAssetType } from "./getAssetType.js";
import { getTemplatePathFromFileName } from "./getTemplatePathFromFileName.js";

export const getAssets = async function(): Promise<Assets> {
    const pathsToAssets = await getFiles();
    const fileAssets: Assets = await Promise.all(pathsToAssets.map(async (assetPath: string) => {
        const fileContent = await _readFile(assetPath)
            .catch(err => console.error("there was an error:", err)) as string;
        const fileInfo = parse(assetPath);
        const namePartsArray = fileInfo.name.split(".");
        const fm: matter.GrayMatterFile<string> = Object.freeze(matter(fileContent));
        const asset: Asset = {
            assetType: getAssetType(assetPath),
            fileName: assetPath,
            fileType: fileInfo.ext,
            content: fileInfo.ext === ".md" ? markdownToHTML(fm.content) : fm.content,
            fm,
        };
        if (asset.assetType !== "page") return asset;
        asset.associatedTemplate = getTemplatePathFromFileName(assetPath);
        const oPath = fileInfo.dir.split("/").slice(2).join("/"); // removes 'src/' and the parent folder containing pages.
        const oName = namePartsArray[namePartsArray.length - 1] === "index" ? "index.html" :
            namePartsArray[namePartsArray.length - 1] + "/" + "index.html";
        asset.htmlDocumentName = join(oPath, oName);
        return asset;
    }));
    return fileAssets;
};
