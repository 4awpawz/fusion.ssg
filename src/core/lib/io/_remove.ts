/**
 * _remove - wrapper for rmSync.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _remove = async function(path: string): Promise<void> {
    try {
        await fs.rm(path, { recursive: true, force: true });
    } catch (error) {
        console.error(chalk.red(`there was an error: When deleting folder ${path}`));
        throw error;
    }
};
