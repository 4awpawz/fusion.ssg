/**
 * tokenize - Tokenizes each generated document with the token values from their respective contributing template.
 */

import type { Assets } from "../../../types/types";
import { composeTokens } from "./composeTokens.js";

export const tokenize = async function(assets: Assets): Promise<Assets> {
    for (const asset of assets) {
        if (asset.assetType !== "template" || asset?.fm?.data["isCollection"]
            || typeof asset.fm?.content === "undefined") continue;
        const tokens = typeof asset.fm.data["tokens"] === "undefined" ? {} : asset.fm.data["tokens"];
        asset.content = await composeTokens(asset.content as string, tokens);
    }
    return assets;
};
