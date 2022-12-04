/**
 * config - Returns immutable Configuration object.
 * Note: The choice was made not to export a static config object as it would require
 * the user to restart node whenever they make a change to their config file.
 */

import path from "path";
import { _readJsonFile } from "../../lib/io/_readJsonFile.js";
import { _fileExists } from "../../lib/io/_fileExists.js";
import { configFileName } from "./configFileName.js";
import type { Configuration } from "../../../types/types";

export const getConfiguration = async function(): Promise<Configuration> {
    const defaultConfig: Configuration = {
        srcFolder: "src", // Folder that contains the project's source.
        buildFolder: "build", // Folder that contains the project's build.
        libFolder: "lib", // Folder that contains transpiled components.
        componentsFolder: "components", // Folder that contains component definitions.
        dataFolder: "data", // Folder that contains data referenced by components.
        userConfig: {
            postsFolder: "posts", // Folder that contains postsA. Can be renamed by user.
        },
    };
    const configPath = path.join(process.cwd(), configFileName);
    if (!_fileExists(configPath)) return defaultConfig;
    const userConfig = await _readJsonFile(configPath);
    if (typeof userConfig === "undefined") return ({ ...defaultConfig });
    defaultConfig.userConfig = { ...defaultConfig.userConfig, ...userConfig };
    return { ...defaultConfig };
};
