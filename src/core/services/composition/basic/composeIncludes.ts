/**
 * composeIncludes - Compose with include assets.
 */

import { join } from "path";
import { findAndReplaceTokenContent } from "../../../lib/token/findAndReplaceTokenContent.js";
import { _find } from "../../../lib/functional.js";
import { getConfiguration } from "../../configuration/getConfiguration.js";
import type { Asset, Assets, IncludeMatchesResults } from "../../../../types/types";

const getListOfIncludesFromAsset = function(asset: Asset): IncludeMatchesResults {
    const regexIncludeFileName = /\{include:([/a-zA-Z0-9]+)}/g;
    const matches = [...asset.content.matchAll(regexIncludeFileName)];
    if (typeof matches === "undefined") return [];
    return matches.map(match => ({ matched: match[0] as string, fileName: match[1] as string })) as IncludeMatchesResults;
};

export const composeIncludes = async function(asset: Asset, assets: Assets): Promise<Asset> {
    const srcFolder = (await getConfiguration()).srcFolder;
    const matcherResults = getListOfIncludesFromAsset(asset);
    if (matcherResults.length === 0) return asset;
    for (const matchResult of matcherResults) {
        const pathToInclude = join(`${srcFolder}`, "includes", matchResult.fileName);
        const foundInclude = _find(assets, _asset =>
            _asset.assetType === "include" && (_asset.fileName === `${pathToInclude}.html` || _asset.fileName === `${pathToInclude}.md`));
        if (typeof foundInclude === "undefined")
            throw new Error(`there was an error: unable to find include file ${pathToInclude} declared in ${asset.fileName}`);
        asset.content = findAndReplaceTokenContent(asset.content, matchResult.matched, foundInclude.content);
    }
    return asset;
};
