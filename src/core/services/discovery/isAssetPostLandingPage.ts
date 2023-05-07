/**
 * isPostLandingPage - Returns true if the asset is an index file and its path points to the posts folder, false otherwise.
 */

import { parse } from "path";
import { config } from "../configuration/configuration.js";

export const isAssetPostLandingPage = function(assetPath: string): boolean {
    const assetPathParts = parse(assetPath);
    if (assetPathParts.name !== "index") return false;
    return assetPathParts.dir.includes(config.postsFolder);
};
