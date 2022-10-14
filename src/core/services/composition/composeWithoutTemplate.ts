/**
 * composeWithoutTemplate - Compose without a template asset.
 */

import { composeIncludes } from "./composeIncludes.js";
import { composeTokens } from "./composeTokens.js";

export const composeWithoutTemplate = async function(asset: Asset, assets: Assets): Promise<Asset> {
    // Resolve includes.
    asset = await composeIncludes(asset, assets);
    // Resolve front matter tokens.
    asset.content = composeTokens(asset.content, asset.fm.data);
    return asset;
};
