/**
 * makeNewAsset - Makes a copy of the collection template for use in a collection.
 */

import type { Asset, CollectionPageProfile } from "../../../../types/types";
import { join, parse } from "path";
import { renderToString } from "preact-render-to-string";

export const makeNewAsset = function(asset: Asset, collectionPageProfile: CollectionPageProfile, componentTag: string): Asset {
    const newAsset: Asset = JSON.parse(JSON.stringify(asset));
    delete newAsset?.fm?.data["isCollection"];
    newAsset.content = newAsset.content?.replace("{title}", collectionPageProfile.title) as string;
    const html = renderToString(collectionPageProfile.content);
    newAsset.content = newAsset.content?.replace(componentTag, html);
    const htmlDocumentPath = parse(asset.filePath).dir.split("/").slice(2).join("/");
    newAsset.htmlDocumentName = join(htmlDocumentPath, collectionPageProfile.htmlDocumentName, "index.html");
    newAsset.url = parse(newAsset.htmlDocumentName).dir + "/";
    return newAsset;
};
