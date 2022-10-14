/**
 * config - Returns immutable Configuration object.
 * Note: The choice was made not to export a static config object as it would require
 * the user to restart node whenever they make a change to their config file.
 */

import path from "path";
import { _readJsonFile } from "../../lib/io/_readJsonFile.js";
import { _fileExists } from "../../lib/io/_fileExists.js";
import { deepFreeze } from "../deepFreeze.js";

export const getConfiguration = async function(): Promise<Configuration> {
    const defaultConfig: Configuration = {
        projectStructure: {
            srcFolder: "src", // Name of folder that contains the project's source.
            buildFolder: "build", // Name of folder that contains the project's build.
            articlesFolder: "articles", // Name of src folder  that contains articles
        },
    };
    const configPath = path.join(process.cwd(), "yada.json");
    if (!_fileExists(configPath)) return deepFreeze(defaultConfig);
    const userConfig = await _readJsonFile(configPath);
    return deepFreeze({ ...defaultConfig, ...userConfig });
};
