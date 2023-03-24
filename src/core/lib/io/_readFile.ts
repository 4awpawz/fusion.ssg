/**
 * _readFile - async/await wrapper for readFile.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _readFile = async function(path: string, options = "utf8"): Promise<string | undefined> {
    try {
        return await fs.readFile(path, options);
    } catch (error) {
        console.error(chalk.red(`there was an error: When reading file ${path}`));
        throw error;
    }
};
