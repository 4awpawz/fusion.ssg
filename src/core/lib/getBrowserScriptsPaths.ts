/**
 * getBrowserScriptsPaths - returns string[].
 */

import path from "path";
import { config } from "../services/configuration/configuration.js";
import { _glob } from "./io/_glob.js";

const globPath = path.join(config.srcFolder, config.scriptsFolder, "/**/*.ts");
export const browserScriptsPaths = await _glob(globPath);
