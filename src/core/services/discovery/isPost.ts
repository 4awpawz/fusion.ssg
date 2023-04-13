/**
 * isPost - Returns true if asset's path points to a post, false otherwise.
 */

import { parse } from "path";
import { config } from "../configuration/configuration.js";

export const isPost = async function(assetPath: string): Promise<boolean> {
    const assetPathParts = parse(assetPath);
    // Posts will never be named 'index'.
    if (assetPathParts.name === "index") return false;
    const postFolderPath = config.postsFolder;
    return parse(assetPath).dir.includes(postFolderPath);
};
