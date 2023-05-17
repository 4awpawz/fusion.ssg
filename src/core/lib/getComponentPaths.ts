/**
 * getComponentPaths - returns string[].
 */

import path from "path";
import { config } from "../services/configuration/configuration.js";
import { _filter } from "./functional.js";
import { _glob } from "./io/_glob.js";

const globPath = path.join(config.srcFolder, config.componentsFolder) + `/*.{tsx,jsx}`;
const paths = await _glob(globPath);
const extensions = [".tsx", ".jsx"];
export const componentPaths = _filter(paths, _path => extensions.includes(path.parse(_path).ext));
