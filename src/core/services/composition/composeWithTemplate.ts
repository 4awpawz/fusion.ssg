import { ignoreTokens } from "./ignoreTokens.js";
import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";
import { _find } from "../../lib/functional.js";
import { composeIncludes } from "../composition/composeIncludes.js";

export const composeWithTemplate = function(asset: Asset, assets: Asset[]): Asset{
    const associatedTemplate =
        _find(assets,_asset => _asset.assetType === "template" && _asset.fileName === `src/template.${asset.associatedTemplate}.html`);
    if (typeof associatedTemplate === "undefined") throw new Error(`there was an error: unable to find template ${asset.associatedTemplate}`);
    // Replace templat's {page} marker with the page's content.
    asset.content = markerFindAndReplaceContent(associatedTemplate.content, "page", asset.content);
    // Resolve markers using template's fm.
    for (const [key, value] of Object.entries(associatedTemplate.fm.data)) {
        if (!ignoreTokens.includes(key)) {
            asset.content = markerFindAndReplaceContent(asset.content, key, value as string);
        }
    }
    // Resolve markers using page's fm.
    for (const [key, value] of Object.entries(asset.fm.data)) {
        if (!ignoreTokens.includes(key)) {
            asset.content = markerFindAndReplaceContent(asset.content, key, value as string);
        }
    }
    // Resolve includes.
    asset = composeIncludes(asset, assets);
    return asset;
};
