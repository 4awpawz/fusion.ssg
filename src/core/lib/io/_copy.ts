/**
 * copy - Copy a file or the content of a folder.
 */

import { copy } from "fs-extra";

export const _copy = async function(src: string, dest: string): Promise<void> {
    try {
        await copy(src, dest, { overwrite: true });
    } catch (error) {
        console.error(`there was an error when copying file ${src} to ${dest}`);
        throw error;
    }
};
