/**
 * copyFiles - Copies components/data/** to lib/data/ */

import { join } from "path";
import { _copy } from "../../lib/io/_copy.js";
import { getConfiguration } from "../configuration/getConfiguration.js";


const configuration = await getConfiguration();

export const copyDataFilesToLib = async function(): Promise<void> {
    const src = join(configuration.srcFolder, configuration.componentsFolder, configuration.dataFolder);
    const dest = join(configuration.libFolder, configuration.dataFolder);
    await _copy(src, dest);
    return;
};
