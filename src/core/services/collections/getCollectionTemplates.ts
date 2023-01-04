/**
 * getCollectionTemplates - Returns an array of collection templates.
 */

import type { Assets } from "../../../types/types";

export const getCollectionTemplates = function(assets: Assets): Assets {
    return assets.filter(_asset => _asset.assetType === "template" && _asset.fm?.data["isCollection"]);
};
