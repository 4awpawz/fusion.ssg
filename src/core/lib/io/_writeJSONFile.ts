/**
 * _wrtieJSONFile - async/await wrapper for _wrtieJson.
 */

import fs from "fs-extra";

export const _writeJSONFile = async function(path: string, object: any): Promise<void> {
    try {
        await fs.writeJson(path, object);
    } catch (error) {
        console.error(`there was an error writing JSON file ${path}.`);
        throw error;
    }
};
