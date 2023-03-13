/**
 * getComponentPaths - returns string[].
 */

import path from "path";
import { getConfiguration } from "../services/configuration/getConfiguration.js";
import { _glob } from "./io/_glob.js";

const extensions = [".tsx"];
const config = await getConfiguration();
const paths = await _glob(path.join(config.srcFolder, config.componentsFolder, "*.tsx"));
export const componentPaths = paths.filter(_path => extensions.includes(path.parse(_path).ext));
