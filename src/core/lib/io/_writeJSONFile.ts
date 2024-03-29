/**
 * _wrtieJSONFile - async/await wrapper for _wrtieJson.
 */

import chalk from "chalk";
import fs from "fs-extra";

export const _writeJSONFile = async function(path: string, object: unknown, options = {}): Promise<void> {
    try {
        await fs.writeJson(path, object, options);
    } catch (error) {
        console.error(chalk.red(`there was an error: When writing JSON file ${path}.`));
        throw error;
    }
};
