/**
 * getDataSources - Returns the data associated with one or
 * moredatdata sources that is declared in a component token.
 */

import path from "path";
import type { BuffersMap, DataSource } from "../../../../types/types";
import { getConfiguration } from "../../../services/configuration/getConfiguration.js";
import { _readJSONFile } from "../../../lib/io/_readJsonFile.js";

export const getDataSources = async function(dataSources: DataSource[]): Promise<BuffersMap> {
    const config = await getConfiguration();
    const buffersMap: BuffersMap = {};
    for (const dataSource of dataSources) {
        const _path = path.join(config.srcFolder, config.dataFolder, dataSource);
        const buffer = await _readJSONFile(_path);
        const name = path.parse(dataSource).name;
        buffersMap[name] = buffer as any;
    }
    return buffersMap;
};
