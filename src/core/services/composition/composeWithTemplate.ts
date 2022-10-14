/**
 * composeWithTemplate - Compose with a template asset.
 */

import { _find } from "../../lib/functional.js";
import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";
import { composeIncludes } from "./composeIncludes.js";
import { composeTokens } from "./composeTokens.js";

export const composeWithTemplate = async function(asset: Asset, assets: Asset[]): Promise<Asset> {
    const associatedTemplate =
        _find(assets, _asset => _asset.assetType === "template" && _asset.fileName === asset.associatedTemplate) as Asset;
    if (typeof associatedTemplate === "undefined")
        if (!associatedTemplate)
            throw new Error(`there was an error: unable to find associated template for ${asset.fileName}`);
    // Inject the page's content into the Template's "{page}" marker.
    asset.content = markerFindAndReplaceContent(associatedTemplate.content, "page", asset.content);
    // Resolve includes.
    asset = await composeIncludes(asset, assets);
    // Resolve front matter tokens.
    const fmData = { ...associatedTemplate.fm.data, ...asset.fm.data };
    asset.content = composeTokens(asset.content, fmData);
    return asset;
};
