/**
 * clearnBuildFolder - empties the build folder.
 */

import type { Configuration } from "../../types/types";
import path from "path";
import { _glob } from "./io/_glob.js";
import { _remove } from "./io/_remove.js";

export const cleanBuildFolder = async function(config: Configuration): Promise<void> {
    const contentPaths = await _glob(path.join(process.cwd(), config.buildFolder));
    for (const contentPath of contentPaths) {
        await _remove(contentPath);
    }
    return;
};
