/**
 * getDataSources - Returns the data associated with
 * one or more data sources declared in a component token.
 */

import path from "path";
import type { BuffersMap, Configuration, DataSource } from "../../../types/types.js";
import { readCache } from "../../lib/cache.js";

export const getDataSources = async function(dataSources: DataSource[], config: Configuration): Promise<BuffersMap> {
    const buffersMap: BuffersMap = Object.create(null);
    for (const dataSource of dataSources) {
        const _path = path.join(config.srcFolder, config.dataFolder, dataSource);
        const buffer = await readCache(_path);
        const name = path.parse(dataSource).name;
        buffersMap[name] = buffer;
    }
    return buffersMap;
};
