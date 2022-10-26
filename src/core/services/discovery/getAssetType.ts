/**
 * getAssetType - Returns the type of the asset.
 */

import { parse } from "path";
import type { AssetType } from "../../../types/types";

export const getAssetType = function(pathToAsset: string): AssetType {
    switch (parse(pathToAsset).dir.split("/")[1]) {
        case "templates":
            return "template";
        case "includes":
            return "include";
        default:
            return "page";
    }
};
