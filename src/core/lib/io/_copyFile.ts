/**
 * _copyFile - async/await wrapper for copy.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _copyFile = async function(path: string, dest: string): Promise<void> {
    try {
        await fs.copy(path, dest);
    } catch (error) {
        console.error(chalk.red(`there was an error: Unable to copy file ${path} to ${dest}`));
        throw error;
    }
};
