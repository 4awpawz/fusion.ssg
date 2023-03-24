/**
 * _readJSONfile - async/await wrapper for readJSONFile.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _readJSONFile = async function(path: string, options = "utf8"): Promise<unknown | void> {
    try {
        return await fs.readJson(path, options);
    } catch (error) {
        console.error(chalk.red(`there was an error: When reading JSON file ${path}`));
        throw error;
    }
};
