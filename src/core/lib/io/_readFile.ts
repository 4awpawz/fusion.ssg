/**
 * _readFile - async/await wrapper for readFile.
 */

import fs from "fs-extra";

export const _readFile = async function(path: string, options = "utf8"): Promise<string | undefined> {
    let buf;
    try {
        buf = await fs.readFile(path, options);
    } catch (error) {
        console.error("there was an error:", error);
    }
    return buf;
};
