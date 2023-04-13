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

const cacheJSONFile = async function(path: string): Promise<Map<unknown, unknown>> {
    return rCache.set(path, _readJSONFile(path));
};

const cacheFile = async function(path: string): Promise<Map<unknown, unknown>> {
    return rCache.set(path, await _readFile(path));
};

export const deleteCachedFile = function(path: string): void {
    rCache.delete(path);
};

export const readCache = async function(path: string): Promise<unknown> {
    !rCache.has(path) && _fileExists(path) &&
        (parse(path).ext === ".json" && cacheJSONFile(path) || cacheFile(path));
    return rCache.get(path);
};

export const clearCache = function(): void {
    if (rCache.size) rCache.clear();
};
