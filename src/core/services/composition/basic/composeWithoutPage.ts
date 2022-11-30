/**
 * composeWithoutTemplate - Compose without a template asset.
 */

import { composeIncludes } from "./composeIncludes.js";
import { composeTokens } from "./composeTokens.js";
import type { Asset, Assets } from "../../../../types/types";

export const composeWithoutPage = async function(asset: Asset, assets: Assets): Promise<Asset> {
    // Resolve includes.
    asset = await composeIncludes(asset, assets);
    // Resolve front matter tokens.
    if (typeof asset.fm === "undefined") return asset;
    asset.content = composeTokens(asset.content as string, asset.fm.data);
    return asset;
};
