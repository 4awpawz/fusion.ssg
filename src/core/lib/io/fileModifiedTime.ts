
/**
 * fileModifiedTime - returns the time in ms when file (path) was last modified.
 */

import fs from "fs-extra";

export const fileModifiedTime = async function(path: string): Promise<number> {
    try {
        const stats = await fs.promises.stat(path);
        return stats.mtimeMs;
    } catch (error) {
        console.error(`there was an error: unable to get stats for file ${path}`);
        throw error;
    }
};
