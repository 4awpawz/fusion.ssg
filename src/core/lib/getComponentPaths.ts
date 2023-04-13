/**
 * getComponentPaths - returns string[].
 */

import path from "path";
import { config } from "../services/configuration/configuration.js";
import { _filter } from "./functional.js";
import { _glob } from "./io/_glob.js";

const extensions = [".tsx"];
const paths = await _glob(path.join(config.srcFolder, config.componentsFolder, "*.tsx"));
export const componentPaths = _filter(paths, _path => extensions.includes(path.parse(_path).ext));
