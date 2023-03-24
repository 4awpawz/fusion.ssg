/**
 * fileModifiedTime - returns the time in ms when file (path) was last modified.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const fileModifiedTime = async function(path: string): Promise<number> {
    try {
        const stats = await fs.promises.stat(path);
        return stats.mtimeMs;
    } catch (error) {
        console.error(chalk.red(`there was an error: When getting stats for file ${path}`));
        throw error;
    }
};
