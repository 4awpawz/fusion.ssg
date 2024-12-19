/**
 * _glob - async/await wrapper for glob.
 */

import chalk from "chalk";
import { glob, GlobOptions } from "glob";

export const _glob = async function(pattern: string, options: GlobOptions = {}): Promise<string[]> {
    const ignore = ["node_modules/**"];
    options.ignore && ignore.push(options.ignore as string);
    const _options = { ignore };
    let paths = [] as string[];
    try {
        paths = await glob(pattern, _options);
    } catch (error) {
        console.error(chalk.red(`there was an error: When calling glob with pattern ${pattern}`));
        throw error;
    }
    return paths;
};
