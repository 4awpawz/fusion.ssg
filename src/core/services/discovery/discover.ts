/**
 * Discovery - kull all assets, then create AssetTypes from them and then map them by AssetType.
 */

import { getFileAssets } from "./getFileAssets.js";

export const discover = async function(): Promise<Assets> {
    return await getFileAssets();
};
