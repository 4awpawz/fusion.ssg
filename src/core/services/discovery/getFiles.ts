/**
 * getFiles - Returns a list of all files that are projec assets.
 */

import { parse } from "path";
import { _glob } from "../../lib/io/_glob.js";
import { _filter } from "../../lib/functional.js";
import { getConfiguration } from "../configuration/getConfiguration.js";


export const getFiles = async function(): Promise<string[]> {
    const srcFolder = (await getConfiguration()).projectStructure.srcFolder;
    const result = await _glob(`${srcFolder}/**/*.*`);
    const paths = result.value as string[];
    return _filter(paths, path => ["templates", "includes", "pages"].includes(parse(path).dir.split("/")[1] as string));
};
