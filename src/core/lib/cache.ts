/**
 * File cache management.
 * Uses Map. Keys are names of files, including their paths.
 * JSON content is cached as JS Objects.
 */

import { parse } from "path";
import chalk from "chalk";
import { _fileExists } from "./io/_fileExists.js";
import { _readFile } from "./io/_readFile.js";
import { _readJSONFile } from "./io/_readJsonFile.js";

const rCache = new Map();

const cacheJSONFile = async function(path: string): Promise<Map<unknown, unknown>> {
    return rCache.set(path, await _readJSONFile(path));
};

const cacheFile = async function(path: string): Promise<Map<unknown, unknown>> {
    return rCache.set(path, await _readFile(path));
};

export const deleteCachedFile = function(path: string): void {
    rCache.delete(path);
};

export const readCache = async function(path: string): Promise<string | object> {
    const fileExists = _fileExists(path);
    fileExists && !rCache.has(path) && (parse(path).ext === ".json" && await cacheJSONFile(path) || await cacheFile(path));
    if (fileExists) return rCache.get(path);
    // Theoretically the following should never occur but better to handle it just in case.
    console.log(chalk.red(`there was an error: File ${path} does not exist and aborting process.`));
    process.abort();
};

export const clearCache = function(): void {
    if (rCache.size) rCache.clear();
};
