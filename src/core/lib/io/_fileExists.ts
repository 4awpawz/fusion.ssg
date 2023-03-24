/**
 * _fileExists - Wrapper for fileExists.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _fileExists = function(path: string): boolean {
    try {
        return fs.existsSync(path);
    } catch (error) {
        console.error(chalk.red(`there was an error: When checking if file ${path} exists`));
        throw error;
    }
};
