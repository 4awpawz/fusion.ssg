/**
 * copyFiles - Copies recognized files and folders to their target folders, being either build and lib.
 */

import { join } from "path";
import { _ensureDir } from "../../lib/io/_ensureDir.js";
import { _copy } from "../../lib/io/_copy.js";
import { getConfiguration } from "../configuration/getConfiguration.js";


const configuration = await getConfiguration();

/**
 * Copy files to the lib folder.
 */

export const copyToLib = async function(): Promise<void> {
    const src = join(configuration.srcFolder, configuration.componentsFolder, configuration.dataFolder);
    const dest = join(configuration.libFolder, configuration.dataFolder);
    // Ensure that the lib/data/ folder exists.
    _ensureDir(dest);
    // Copy the files from the src/components/data/ folder to the lib/ folder
    _copy(src, dest);
    return;
};

/**
 * Copy files to the build folder.
 */

export const copyToBuild = async function(): Promise<void> {
    return;
};
