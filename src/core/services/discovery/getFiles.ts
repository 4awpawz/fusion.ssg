/**
 * getFiles - Returns a list of all files that are projec assets.
 */

import { parse } from "path";
import { _glob } from "../../lib/io/_glob.js";
import { _filter } from "../../lib/functional.js";
import { config } from "../configuration/configuration.js";

export const getFiles = async function(): Promise<string[]> {
    const srcFolder = config.srcFolder;
    const paths = await _glob(`${srcFolder}/**/*.*`);
    return _filter(paths, path => ["templates", "includes", "pages", "components"].includes(parse(path).dir.split("/")[1] as string));
};
