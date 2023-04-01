/**
 * config - Returns immutable Configuration object.
 * Note: The choice was made not to export a static config object as it would require
 * the user to restart node whenever they make a change to their config file.
 * Note: A static config object is not exported becau the user can make changes to theirs.
 */

import path from "path";
import { _readJSONFile } from "../../lib/io/_readJsonFile.js";
import { _fileExists } from "../../lib/io/_fileExists.js";
import { configFileName } from "./configFileName.js";
import type { Configuration, UserConfig } from "../../../types/types";

export const getConfiguration = async function(): Promise<Configuration> {
    const defaultConfig: Configuration = {
        srcFolder: "src", // Folder that contains the project's source.
        buildFolder: "build", // Folder that contains the project's build.
        libFolder: "lib", // Folder that contains transpiled components.
        componentsFolder: "components", // Folder that contains component definitions.
        dataFolder: "data", // Folder that contains data referenced by components.
        cssFolder: "css", // Folder that contains css.
        scriptsFolder: "scripts", // Folder that contains JavaScript scripts.
        mediaFolder: "media", // Folder that contains media files.
        etcFolder: "etc", // Folder that contains etc type files.
        userConfig: {
            postsFolder: "posts", // Folder that contains postsA.
            baseURL: "", // Base URL that can be applied as a token via {baseURL}.
            wips: []
        },
    };
    const configPath = path.join(process.cwd(), configFileName);
    if (!_fileExists(configPath)) return { ...defaultConfig };
    const userConfig = await _readJSONFile(configPath) as UserConfig;
    if (typeof userConfig === "undefined") return { ...defaultConfig };
    defaultConfig.userConfig = { ...defaultConfig.userConfig, ...userConfig };
    // Note: Sorting wips will allow those that are ignored
    // (they start with an '!') to be evaluated first.
    defaultConfig.userConfig.wips.sort();
    return { ...defaultConfig };
};
