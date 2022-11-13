/**
 * _readJsonFile - async/await wrapper for readJSONFile.
 */

import fs from "fs-extra";

export const _readJsonFile = async function(path: string, options = "utf8"): Promise<JSON | void> {
    try {
        return await fs.readJson(path, options);
    } catch (error) {
        console.error(`there was an error when reading JSON file ${path}`);
        throw error;
    }
};
