/**
 * Compose - Compose pages using CategorizedPages.
 */

import path from "path";
import { composeWithoutTemplate } from "./composeWithoutTemplate.js";
import { composeWithTemplate } from "./composeWithTemplate.js";

export const compose = function(assets: Assets): Assets {
    for (const _asset of assets) {
        if (!path.parse(_asset.fileName).name.startsWith("page.")) continue;
        (_asset.associatedTemplate === "" && composeWithoutTemplate(_asset, assets)) ||
            (typeof _asset.associatedTemplate === "string" && _asset.associatedTemplate.length
                !== 0 && composeWithTemplate(_asset, assets));
    }
    return assets;
};
