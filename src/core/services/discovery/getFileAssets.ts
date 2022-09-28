/**
 * getFileAssets - Creates an assets for each file found in user's
 * src folder. An asset is any file that participates in page compostion.
 * Resolves to an array of assets.
 */

import path from "path";
import matter from "gray-matter";
import { markdownToHTML } from "../../lib/markdownToHTML.js";
import { _glob } from "../../lib/io/_glob.js";
import { _readFile } from "../../lib/io/_readFile.js";

export const getFileAssets = async function(): Promise<Assets> {
    const globResult = await _glob("src/**/*.*");
    const files = globResult.value as string[];
    const fileAssets: Assets = await Promise.all(files.map(async (file) => {
        const fileContent = await _readFile(file)
            .catch(err => console.error("there was an error:", err)) as string;
        const fileInfo = path.parse(file);
        const namePartsArray = fileInfo.name.split(".");
        const fm = matter(fileContent);
        const asset: Asset = {
            assetType: namePartsArray[0] as AssetType,
            fileName: file,
            fileType: fileInfo.ext,
            content: fileInfo.ext === ".md" ? markdownToHTML(fm.content) : fm.content,
            fm,
        };
        if (asset.assetType === "page") {
            asset.associatedTemplate = namePartsArray.length === 3 ? namePartsArray[1] : "";
            const oPath = fileInfo.dir.slice(4);
            const oName = namePartsArray[namePartsArray.length - 1] === "index" ? "index.html" :
                namePartsArray[namePartsArray.length - 1] + "/" + "index.html";
            asset.htmlDocumentName = path.join(oPath, oName);
        }
        return asset;
    }));
    return fileAssets;
};
