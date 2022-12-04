/**
 * composeIncludes - Compose with include assets.
 */

import { join } from "path";
import { findAndReplaceTokenContent } from "../../../lib/token/findAndReplaceTokenContent.js";
import { _find } from "../../../lib/functional.js";
import { getConfiguration } from "../../configuration/getConfiguration.js";
import type { Asset, Assets, IncludeMatchesResults } from "../../../../types/types";

const getListOfIncludesFromAsset = function(assetContent: string): IncludeMatchesResults {
    const regexIncludeFileName = /\{include:([/a-zA-Z0-9]+)}/g;
    const matches = [...assetContent.matchAll(regexIncludeFileName)];
    return matches.map(match => ({ matched: match[0] as string, fileName: match[1] as string })) as IncludeMatchesResults;
};

export const composeIncludes = async function(asset: Asset, assets: Assets): Promise<Asset> {
    if (typeof asset.content === "undefined") return asset;
    const srcFolder = (await getConfiguration()).srcFolder;
    const matcherResults = getListOfIncludesFromAsset(asset.content);
    if (matcherResults.length === 0) return asset;
    for (const matchResult of matcherResults) {
        const pathToInclude = join(`${srcFolder}`, "includes", matchResult.fileName);
        const foundInclude: Asset | undefined = _find(assets, _asset =>
            _asset.assetType === "include" && (_asset.fileName === `${pathToInclude}.html` || _asset.fileName === `${pathToInclude}.md`));
        if (typeof foundInclude === "undefined")
            throw new Error(`there was an error: unable to find include file ${pathToInclude} declared in ${asset.fileName}`);
        const token = matchResult.matched;
        asset.content = findAndReplaceTokenContent(asset.content, token, foundInclude.content as string);
    }
    return asset;
};
