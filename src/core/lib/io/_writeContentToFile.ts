/**
 * _writeContentToFile - async/await wrapper for outputFile.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _writeContentToFile = async function(path: string, content: string): Promise<void> {
    try {
        await fs.outputFile(path, content);
    } catch (error) {
        console.error(chalk.red(`there was an error: Unable to write to file ${path}`));
        throw error;
    }
};
