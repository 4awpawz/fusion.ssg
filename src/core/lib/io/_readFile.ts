/**
 * _readFile - async/await wrapper for readFile.
 */

import chalk from "chalk";
import fs from "fs/promises";

export const _readFile = async function(path: string): Promise<string> {
    try {
        return await fs.readFile(path, { encoding: "utf8" });
    } catch (error) {
        console.error(chalk.red(`there was an error: When reading file ${path}`));
        throw error;
    }
};
