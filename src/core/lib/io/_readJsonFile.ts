/**
 * _readJSONfile - async/await wrapper for readJSONFile.
 */

import fs from "fs-extra";

export const _readJSONFile = async function(path: string, options = "utf8"): Promise<any | void> {
    try {
        return await fs.readJson(path, options);
    } catch (error) {
        console.error(`there was an error when reading JSON file ${path}`);
        throw error;
    }
};
