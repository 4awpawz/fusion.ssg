/**
 * composeWithTemplate - Compose with a template asset.
 */

import { _find } from "../../lib/functional.js";
import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";
import { composeIncludes } from "./composeIncludes.js";
import { composeTokens } from "./composeTokens.js";

export const composeWithTemplate = async function(asset: Asset, assets: Asset[]): Promise<Asset> {
    const associatedPage =
        _find(assets, _asset => _asset.assetType === "page" && _asset.fileName === asset.associatedPage) as Asset;
    // TODO: 22/10/24 16:24:07 - jeffreyschwartz : The type check for undefined should be enough.
    // if (typeof associatedTemplate === "undefined")
    if (!associatedPage)
        throw new Error(`there was an error: unable to find associated page for ${asset.fileName}`);
    // Inject the page's content into the Template's "{page}" marker.
    asset.content = markerFindAndReplaceContent(associatedPage.content, "template", asset.content);
    // Resolve includes.
    asset = await composeIncludes(asset, assets);
    // Resolve front matter tokens.
    const frontmatterData = { ...associatedPage.fm.data, ...asset.fm.data };
    asset.content = composeTokens(asset.content, frontmatterData);
    return asset;
};
