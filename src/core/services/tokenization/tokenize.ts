/**
 * tokenize - Tokenizes each generated document with the token values from their
 * respective contributing template and from global tokens and reports unresolved tokens.
 */

import type { Assets } from "../../../types/types";
import { config } from "../configuration/configuration.js";
import { composeTokens } from "./composeTokens.js";
import * as unresolvedTokens from "./unresolvedTokens.js";

export const tokenize = async function(assets: Assets): Promise<Assets> {
    const globalTokens = config.userConfig.tokens;
    for (const asset of assets) {
        if (asset.assetType !== "template" || asset?.fm?.data["isCollection"]
            || typeof asset.fm?.content === "undefined") continue;
        const templateTokens = typeof asset.fm.data["tokens"] === "undefined" ? {} : asset.fm.data["tokens"];
        const tokens = { ...globalTokens, ...templateTokens };
        asset.content = await composeTokens(asset.content as string, tokens);
        unresolvedTokens.note(asset.content, asset.htmlDocumentName as string);
    }
    unresolvedTokens.report();
    return assets;
};
