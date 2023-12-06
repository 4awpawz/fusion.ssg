/**
 * getAssetType - Returns the type of the asset.
 */

import type { AssetType } from "../../../types/types";

export const getAssetType = function(pathToAsset: string): AssetType {
    if (pathToAsset.startsWith("src/templates")) return "template";
    if (pathToAsset.startsWith("src/includes")) return "include";
    if (pathToAsset.startsWith("src/pages")) return "page";
    if (pathToAsset.startsWith("src/data")) return "data";
    if (pathToAsset.startsWith("src/components")) return "component";
    if (pathToAsset.startsWith("src/css")) return "css";
    return "*";
};
