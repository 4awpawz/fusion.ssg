/**
 * isPost - Returns true if the asset isn't an index file and its path points to the posts folder, false otherwise.
 */

import { parse } from "path";
import { config } from "../configuration/configuration.js";

export const isPost = function(assetPath: string): boolean {
    const assetPathParts = parse(assetPath);
    // Posts will never be named 'index' though index files might
    // reside in the posts folder, such as a blog's landing page.
    // See isPostLandingPage below.
    if (assetPathParts.name === "index") return false;
    return assetPathParts.dir.includes(config.postsFolder);
};
