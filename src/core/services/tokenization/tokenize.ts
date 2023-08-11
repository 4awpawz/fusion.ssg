/**
 * tokenize - Tokenizes each generated document with token values from their respective
 * templates and from global tokens as well as postDate if assets are a post and from
 * baseURL from fusion.json and reports unresolved tokens.
 */

import type { Assets } from "../../../types/types";
import { config } from "../configuration/configuration.js";
import { composeTokens } from "./composeTokens.js";
import * as unresolvedTokens from "./unresolvedTokens.js";
import * as metrics from "../../lib/metrics.js";

export const tokenize = function(assets: Assets): Assets {
    metrics.startTimer("tokenize");
    const globalTokens = config.userConfig.tokens;
    for (const asset of assets) {
        if (asset.assetType !== "template" || asset?.fm?.data["isCollection"]
            || typeof asset.fm?.content === "undefined") continue;
        const templateTokens = typeof asset.fm.data["tokens"] === "undefined" ? {} : asset.fm.data["tokens"];
        let tokens = { ...globalTokens, ...templateTokens };
        // Add post date as a locale date string to tokens if is a post.
        tokens = asset.isPost ? { ...tokens, postDate: asset.postDate } : tokens;
        // Add categories formatted as a path to tokens if is a post.
        const categories = asset.isPost && typeof asset.fm.data["post"]["categories" as string] !== "undefined" ?
            asset.fm.data["post"]["categories"].replace(" ", "").replace(",", "/") : "";
        tokens = { ...tokens, categories };
        // Add tags to tokens if is a post.
        const tags = asset.isPost && typeof asset.fm.data["post"]["tags" as string] !== "undefined" ? asset.fm.data["post"]["tags"] : "";
        tokens = { ...tokens, tags };
        // Add baseURL to tokens.
        const baseURL = process.env["BUILD_STRATEGY"] === "DEVELOPMENT" ? "" : config.userConfig.baseURL;
        tokens = typeof baseURL !== "undefined" ? { ...tokens, baseURL } : tokens;
        asset.content = composeTokens(asset.content as string, tokens);
        unresolvedTokens.note(asset.content, asset.htmlDocumentName as string);
    }
    unresolvedTokens.report();
    metrics.stopTimer("tokenize");
    return assets;
};
