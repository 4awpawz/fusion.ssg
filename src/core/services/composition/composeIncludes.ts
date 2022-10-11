/**
 * composeIncludes - Compose with include assets.
 */

import { join } from "path";
import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";
import { _find } from "../../lib/functional.js";
import { config } from "../configuration/config.js";

const getListOfIncludesFromAsset = function(asset: Asset): IncludeMatchesResults {
    const regexIncludeFileName = /\{include:([/a-zA-Z0-9]+)}/g;
    const matches = [...asset.content.matchAll(regexIncludeFileName)];
    if (typeof matches === "undefined") return [];
    return matches.map(match => ({ matched: match[0] as string, fileName: match[1] as string })) as IncludeMatchesResults;
};

export const composeIncludes = function(asset: Asset, assets: Assets): Asset {
    const srcFolder = config.projectStructure.srcFolder;
    const matcherResults = getListOfIncludesFromAsset(asset);
    if (matcherResults.length === 0) return asset;
    for (const matchResult of matcherResults) {
        const pathToInclude = join(`${srcFolder}`, "includes", matchResult.fileName);
        const foundInclude = _find(assets, _asset =>
            _asset.assetType === "include" && (_asset.fileName === `${pathToInclude}.html` || _asset.fileName === `${pathToInclude}.md`));
        if (typeof foundInclude === "undefined")
            throw Error(`there was an error: unable to find include file ${pathToInclude} declared in ${asset.fileName}`);
        asset.content = markerFindAndReplaceContent(asset.content, matchResult.matched, foundInclude.content);
    }
    return asset;
};
