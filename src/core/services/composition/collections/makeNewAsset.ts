/**
 * makeNewAsset - Makes a copy of the collection template for use in a collection.
 */

import type { Asset, CollectionPageProfile, Token } from "../../../../types/types";
import { join, parse } from "path";

export const makeNewAsset = function(asset: Asset, collectionPageProfile: CollectionPageProfile, componentTag: string): Asset {
    const newAsset: Asset = JSON.parse(JSON.stringify(asset));
    delete newAsset?.fm?.data["isCollection"];
    newAsset.content = newAsset.content?.replace("{title}", collectionPageProfile.title) as string;
    newAsset.content = newAsset.content?.replace(componentTag, collectionPageProfile.content);
    //html document name
    const htmlDocumentPath = parse(asset.filePath).dir.split("/").slice(2).join("/");
    newAsset.htmlDocumentName = join(htmlDocumentPath, collectionPageProfile.htmlDocumentName, "index.html");
    return newAsset;
};
