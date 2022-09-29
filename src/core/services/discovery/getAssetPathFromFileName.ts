/**
 * parseFileName - Extracts the path to an asset from a file name.
 *
 * "src/pages/documentation/page.doctemplates-docpage.md" => src/doctemplates/template.docpage
 */

import { join, parse } from "path";

export const getAssetPathFromFileName = function(fileName: string): string {
    const fileNamePartsArray = fileName.split("/"); // => ["src/pages", "documentation, "page.doctemplates-docpage.md"]
    const assetPart = fileNamePartsArray[fileNamePartsArray.length - 1] as string; // => "page.doctemplate-docpage.md"
    const asset = assetPart.split(".")[1] as string; // => "doctemplate-docpage"
    const assetPartsArray = asset.split("-"); // => ["doctemplate", "docpage"]
    // const assetName = `src/${assetPartsArray.slice(0, assetPartsArray.length - 1).join("/")}/template.${assetPartsArray[assetPartsArray.length - 1]}`;
    const assetName =
        join("src/", assetPartsArray.slice(0, assetPartsArray.length - 1).join("/"), `template.${assetPartsArray[assetPartsArray.length - 1]}` as string);
    return assetName;
};
