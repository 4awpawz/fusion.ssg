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
        console.log(chalk.red(`there was an error: Unable to find associated page for ${asset.filePath}`));
        return asset;
    }
    // Replace the template's content with the composed page's content.
    asset.content = findAndReplaceTokenContent(associatedPage.content as string, `{{template}}`, asset.content as string);
    // Resolve all includes.
    asset = await composeIncludes(asset, assets);
    if (typeof associatedPage.fm === "undefined" || typeof asset.fm === "undefined") return asset;
    // Resolve front matter tokens.
    asset.content = await composeTokens(asset.content as string, asset.fm.data["tokens"]);
    return asset;
};
