/**
 * _ensureDir - Ensures that the directory exists. If the directory structure does not exist, it is created.

 */

import { ensureDir } from "fs-extra";

export const _ensureDir = async function(dir: string): Promise<void> {
    try {
        ensureDir(dir);
    } catch (error) {
        console.error(`there was an error when creating directory ${dir}`);
        throw error;
    }
};
