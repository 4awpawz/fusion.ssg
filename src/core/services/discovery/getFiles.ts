/**
 * getFiles - Returns a list of all files that are projec assets.
 */

import { join, parse } from "path";
import { _glob } from "../../lib/io/_glob.js";
import { _filter } from "../../lib/functional.js";
import { config } from "../configuration/configuration.js";

export const getFiles = async function(): Promise<string[]> {
    const srcFolder = config.srcFolder;
    // The src/css/libs folder is ignored as it is reserved for 3rd party libraries.
    const paths = await _glob(`${srcFolder}/**/*.*`, { ignore: join(config.srcFolder, config.cssFolder, config.cssLibsFolder) + "/**" });
    return _filter(paths, path => ["templates", "includes", "pages", "components", "css"].includes(parse(path).dir.split("/")[1] as string));
};
