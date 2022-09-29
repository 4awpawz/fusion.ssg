/**
 * composeWithTemplate - Compose with a template asset.
 */

import { _find } from "../../lib/functional.js";
import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";
import { composeIncludes } from "./composeIncludes.js";
import { composeTokens } from "./composeTokens.js";

export const composeWithTemplate = function(asset: Asset, assets: Asset[]): Asset {
    const associatedTemplate =
        _find(assets, _asset => _asset.assetType === "template" && _asset.fileName === `${asset.associatedTemplate}.html`) as Asset;
    if (typeof associatedTemplate === "undefined")
        throw Error(`there was an error: unable to find associated template for ${asset.fileName}`);
    // Inject the page's content into the Template's "{page}" marker.
    asset.content = markerFindAndReplaceContent(associatedTemplate.content, "page", asset.content);
    // Resolve includes.
    asset = composeIncludes(asset, assets);
    // Resolve front matter tokens.
    const fmData = { ...associatedTemplate.fm.data, ...asset.fm.data };
    console.log(`fmData for page ${asset.fileName}`, fmData);
    asset.content = composeTokens(asset.content, fmData);
    return asset;
};
