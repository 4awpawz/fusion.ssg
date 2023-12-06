/**
 * tokenize - 1) Tokenizes each generated document (asset.content) with token values
 * and also tokenizes {baseURL} in CSS (asset.content).
 */

import type { Assets, Tokens } from "../../../types/types";
import { config } from "../configuration/configuration.js";
import { composeTokens } from "./composeTokens.js";
import * as unresolvedTokens from "./unresolvedTokens.js";
import * as metrics from "../../lib/metrics.js";
import { _filter } from "../../lib/functional.js";

export const tokenize = function(assets: Assets): Assets {
    metrics.startTimer("tokenize");
    const globalTokens = config.userConfig.tokens;
    const baseURL = process.env["BUILD_STRATEGY"] === "DEVELOPMENT" ? "" : config.userConfig.baseURL;
    const templateAssets = _filter(assets, asset => asset.assetType === "template" && !asset.isCollection && typeof asset.fm?.content !== "undefined");
    for (const asset of templateAssets) {
        // Add template tokens.
        const templateTokens = typeof asset.fm?.data["tokens"] === "undefined" ? {} : asset.fm.data["tokens"];
        // Add global tokens.
        let tokens: Tokens = { ...globalTokens, ...templateTokens };
        // Add post date as a locale date string to tokens if is a post.
        tokens = asset.isPost ? { ...tokens, postDate: asset.postDate } : tokens;
        // Add post categories formatted as a path to tokens if is a post.
        const categories = asset.isPost && typeof asset.fm?.data["post"]["categories" as string] !== "undefined" ?
            asset.fm.data["post"]["categories"].replace(" ", "").replace(",", "/") : "";
        tokens = { ...tokens, categories };
        // Add post tags to tokens if is a post.
        const tags = asset.isPost && typeof asset.fm?.data["post"]["tags" as string] !== "undefined" ? asset.fm.data["post"]["tags"] : "";
        tokens = { ...tokens, tags };
        tokens = { ...tokens, baseURL };
        asset.content = composeTokens(asset.content as string, tokens);
        unresolvedTokens.note(asset.content, asset.htmlDocumentName as string);
    }
    unresolvedTokens.report();
    const cssAssets = _filter(assets, asset => asset.assetType === "css");
    for (const asset of cssAssets) {
        asset.content = (asset.content as string).replaceAll("{baseURL}", baseURL);
    }
    metrics.stopTimer("tokenize");
    return assets;
};
