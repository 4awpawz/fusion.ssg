/**
 * Generator - Create n coppies of a collection template where n is the number of items in the
 * template's data source collection property.
 *  Collection templates are identified by the boolean front matter property 'isCollection' when set to true.
 */

// import path from "path";
// import type { Assets, Asset } from "../../../types/types";
// import { getCollectionTemplates } from "./getCollectionTemplates.js";
// import { getConfiguration } from "../configuration/getConfiguration.js";
// import { _readJSONFile } from "../../lib/io/_readJsonFile.js";
// import * as metrics from "../../lib/metrics.js";

// const config = await getConfiguration();

// const cloneCollectionTemplate = async function(asset: Asset): Promise<void> {
//     const dataSource = asset.fm?.data["dataSource"];
//     if (typeof dataSource === "undefined" || dataSource.length === 0) return;
//     const dataSourcePath = path.join(config.srcFolder, config.dataFolder, dataSource);
//     const data = await _readJSONFile(dataSourcePath);
//     if (typeof data === "undefined" || data.length === 0) return;
//     const count = data.length;
//     const collection = [];
//     for (let i = 0; i < count; i++) {
//         const copy = { ...asset };
//         collection.push(copy);
//     }
//     asset.collection = collection;
// };

// export const generator = async function(assets: Assets): Promise<Assets> {
//     metrics.startTimer("generator");
//     const collectionAssets = getCollectionTemplates(assets);
//     for (const asset of collectionAssets) {
//         cloneCollectionTemplate(asset);
//     }
//     metrics.stopTimer("generator");
//     return assets;
// };
