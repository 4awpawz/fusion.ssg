/**
 * _fileExists - Wrapper for fileExists.
 */

import fs from "fs-extra";

export const _fileExists = function(path: string): boolean {
    try {
        return fs.existsSync(path);
    } catch (error) {
        console.error(`there was an error when checking if file ${path} exists`);
        throw error;
    }
};
