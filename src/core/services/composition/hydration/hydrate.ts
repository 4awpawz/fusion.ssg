/**
 * Compose - Hydrate pages using components.
 */

import type { Assets } from "../../../../types/types";
import { hydrateContent } from "./hydrateContent.js";
import * as metrics from "../../../lib/metrics.js";
import { componentPaths } from "../../../lib/getComponentPaths.js";
import { clearCache } from "../../../lib/cache.js";
import { getComponentProfilesFromTokens } from "../../../lib/getComponentProfilesFromTokens.js";
import { makeComponentsMap } from "../../../lib/makeComponentsMap.js";

export const hydrate = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("hydration");
    if (process.env["OK_TO_CALL_COMPONENTS"] === "0") return assets;
    // const componentPaths = await getComponentPaths();
    const componentsMap = makeComponentsMap(componentPaths);
    clearCache();
    for (const asset of assets) {
        if (asset.assetType !== "template" || typeof asset.content === "undefined") continue;
        const componentProfiles = getComponentProfilesFromTokens(asset.content, "threeBraces");
        if (componentProfiles.length === 0) continue;
        // Document contains compnents, needs hydration.
        const hydratedContent = await hydrateContent(asset.content, componentProfiles, componentsMap, assets);
        asset.content = hydratedContent as string;
    }
    metrics.stopTimer("hydration");
    return assets;
};
