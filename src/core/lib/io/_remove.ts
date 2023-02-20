/**
 * _remove - wrapper for rmSync.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _remove = function(path: string): void {
    try {
        fs.rmSync(path, { recursive: true, force: true });
    } catch (error) {
        console.error(chalk.red(`there was an error when deleting folder ${path}`));
        throw error;
    }
};
