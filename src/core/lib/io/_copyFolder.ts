/**
 * moveFolder - Moves a folder and its content from source to its destination in the build folder.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _copyFolder = async function(sourceFolder: string, destinationFolder: string, options = { overwrite: true }): Promise<void> {
    try {
        await fs.copy(sourceFolder, destinationFolder, options);
    } catch (error) {
        console.error(chalk.red(`there was an error when copying folder ${sourceFolder} to ${destinationFolder}`));
        throw error;
    }
};
