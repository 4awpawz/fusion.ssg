import { markerFindAndReplaceContent } from "../../lib/marker/markerFindAndReplaceContent.js";

const getListOfIncludesFromAsset = function(asset: Asset): IncludeMatchesResults {
    const regexIncludeFileName = /\{include:([a-zA-Z0-9_]+)}/g;
    const matches = [...asset.content.matchAll(regexIncludeFileName)];
    if (typeof matches === "undefined") return [];
    return matches.map(match => ({ matched: match[0] as string, fileName: match[1] as string })) as IncludeMatchesResults;
};

export const composeIncludes = function(asset: Asset, assets: Assets): Asset {
    const matcherResults = getListOfIncludesFromAsset(asset);
    if (matcherResults.length > 0) {
        for (const matchResult of matcherResults) {
            const foundInclude = assets.find(_asset =>
                _asset.assetType === "include" && (_asset.fileName === `src/include.${matchResult.fileName}.html` ||
                    _asset.fileName === `src/include.${matchResult.fileName}.md`));
            if (typeof foundInclude !== "undefined") {
                // Strip off the opening and closing curly braces from matchResult.matched and find the marker and replace it with the include content.
                // const matched  = matchResult.matched.substring(1, matchResult.matched.length - 1);
                asset.content = markerFindAndReplaceContent(asset.content, matchResult.matched, foundInclude.content);
            }
        }
    }
    return asset;
};
