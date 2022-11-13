/**
 * _remove - wrapper for rmSync.
 */

import fs from "fs-extra";

export const _remove = function(path: string): void {
    try {
        fs.rmSync(path, { recursive: true, force: true });
    } catch (error) {
        console.error(`there was an error when deleting folder ${path}`);
        throw error;
    }
};
