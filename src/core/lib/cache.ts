/**
 * File cache management.
* Uses Map. Keys are names of files, including their paths.
* JSON content is cached as JS Objects.
*/

import { parse } from "path";
import { _fileExists } from "./io/_fileExists.js";
import { _readFile } from "./io/_readFile.js";
import { _readJSONFile } from "./io/_readJsonFile.js";

const rCache = new Map();

const cacheJSONFile = async function(path: string, options: string): Promise<void> {
    rCache.set(path, await _readJSONFile(path, options));
};

const cacheFile = async function(path: string, options: string): Promise<void> {
    rCache.set(path, await _readFile(path, options));
};

export const deleteCachedFile = function(path: string): void {
    rCache.delete(path);
};

export const readCache = async function(path: string, options = "utf8"): Promise<unknown> {
    !rCache.has(path) && _fileExists(path) &&
        (parse(path).ext === ".json" && await cacheJSONFile(path, options) || await cacheFile(path, options));
    return rCache.get(path);
};

export const clearCache = function(): void {
    rCache.clear();
};
