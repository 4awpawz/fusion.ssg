/**
 * _glob - async/await wrapper for glob.
 */

import chalk from "chalk";
import glob from "glob";

export const _glob = async function(pattern: string, options = {}): Promise<string[]> {
    const _options = { ...options, ...{ ignore: "node_moduless**/*" } };
    let paths = [] as string[];
    try {
        paths = await glob(pattern, _options);
    } catch (error) {
        console.error(chalk.red(`there was an error when calling glob with pattern ${pattern}`));
        throw error;
    }
    return paths;
};
