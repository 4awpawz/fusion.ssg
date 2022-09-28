/**
 * _readFile - async/await wrapper for FS.read.
 */

import fs from "fs-extra";

export const _readFile = async function(path: string, options="utf8"): Promise<string> {
        return await fs.readFile(path, options);
};
