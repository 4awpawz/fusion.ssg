/**
 * composeWithTemplate - Compose with a template asset.
 */

import { _find } from "../../../lib/functional.js";
import { findAndReplaceTokenContent } from "../../../lib/findAndReplaceTokenContent.js";
import { composeIncludes } from "./composeIncludes.js";
import { composeTokens } from "./composeTokens.js";
import type { Asset } from "../../../../types/types";
import chalk from "chalk";

export const composeWithPage = async function(asset: Asset, assets: Asset[]): Promise<Asset> {
    const associatedPage =
        _find(assets, _asset => _asset.assetType === "page" && _asset.filePath === asset.associatedPage) as Asset;
    if (typeof associatedPage === "undefined") {
        console.log(chalk.red(`there was an error: unable to find associated page for ${asset.filePath}`));
        return asset;
    }
    // Inject the page's content into the Template's "page" token.
    asset.content = findAndReplaceTokenContent(associatedPage.content as string, `{{template}}`, asset.content as string);
    // Resolve includes.
    asset = await composeIncludes(asset, assets);
    if (typeof associatedPage.fm === "undefined" || typeof asset.fm === "undefined") return asset;
    // Resolve front matter tokens.
    // TODO: 23/02/20 09:43:46 - jeffreyschwartz : If pages do not support front matter then this is not necessary.
    const frontmatterData = { ...associatedPage.fm.data, ...asset.fm.data };
    asset.content = composeTokens(asset.content as string, frontmatterData);
    return asset;
};
