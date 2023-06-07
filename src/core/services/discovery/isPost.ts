/**
 * isPost - Returns true if the asset isn't an index file and its path points to the posts folder, false otherwise.
 */

import { parse } from "path";
import { config } from "../configuration/configuration.js";

export const isPost = function(assetPath: string): boolean {
    const assetPathParts = parse(assetPath);
    // Posts will never be named 'index'.
    return assetPathParts.dir.includes(config.postsFolder) && assetPathParts.name !== "index";
};
