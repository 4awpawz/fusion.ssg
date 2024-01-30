/**
 * _readJSONfile - async/await wrapper for readJSONFile.
 * NOTE: Unable to get fs-extra:readJson function to work. An issue
 * was filed (see https://github.com/jprichardson/node-fs-extra/issues/1033).
 * Once this is addressed I will test both implementations and use the one that
 * is faster. Until then, this implementation is actually slightly faster
 * that the previous working fs-extra:readJson.
 */

import chalk from "chalk";
import { readFile } from "fs/promises";

export const _readJSONFile = async function(path: string): Promise<object> {
    try {
        const buf = await readFile(path, { encoding: "utf-8" });
        const obj = JSON.parse(buf) as object;
        return obj;
    } catch (error) {
        console.error(chalk.red(`there was an error: When reading JSON file ${path}`));
        throw error;
    }
};
