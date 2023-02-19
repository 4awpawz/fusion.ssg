/**
 * Compose - Hydrate pages using components.
 */

import { join, parse } from "path";
import type { Assets, ComponentIdentifier, ComponentProfile, ComponentsMap } from "../../../../types/types";
import { hydrateContent } from "./hydrateContent.js";
import * as metrics from "../../../lib/metrics.js";
import { getComponentPaths } from "../../../lib/getComponentPaths.js";
import { clearCache } from "../../../lib/cache.js";

const makeComponentsMap = function(componentPaths: readonly string[]): ComponentsMap {
    const componentsMap: ComponentsMap = {};
    for (const itemPath of componentPaths) {
        // Remove 'src/components/' from the path.
        const componentPath = join(parse(itemPath).dir.split("/").slice(2).join("/"), parse(itemPath).base);
        const componentName = parse(itemPath).name;
        const componentExt = ".js";
        const componentIdentifier: ComponentIdentifier = { modulePath: join(parse(componentPath).dir, componentName + componentExt), moduleName: componentName };
        componentsMap[componentPath] = componentIdentifier;
    }
    return componentsMap;
};

const getComponentProfilesFromTokens = function(assetContent: string): ComponentProfile[] {
    const regex = /\{\{\{(.*?)}}}/g;
    const matches = assetContent.matchAll(regex);
    if (typeof matches === "undefined") return [];
    const _matches = [...matches];
    if (_matches.length === 0) return [];
    const componentProfiles: ComponentProfile[] = [];
    for (const match of _matches) {
        if (typeof match[1] === "undefined") continue;
        // Get the component path and its data sources declared in the token.
        const tokenParts = match[1].split(",");
        const tokenPath = tokenParts[0]; // string - component p
        const tokenDataSources = tokenParts.slice(1).map(item => item.trim()); // string[] - data source(s)
        componentProfiles.push({ token: match[1], path: tokenPath as string, dataSources: tokenDataSources });
    }
    return componentProfiles;
};

export const hydrate = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("hydration");
    if (process.env["OK_TO_CALL_COMPONENTS"] === "0") return assets;
    const componentPaths = await getComponentPaths();
    const componentsMap = makeComponentsMap(componentPaths);
    clearCache();
    for (const asset of assets) {
        if (asset.assetType !== "template" || typeof asset.content === "undefined") continue;
        const componentProfiles = getComponentProfilesFromTokens(asset.content);
        if (componentProfiles.length === 0) continue;
        // Document contains compnents, needs hydration.
        const hydratedContent = await hydrateContent(asset.content, componentProfiles, componentsMap);
        asset.content = hydratedContent as string;
    }
    metrics.stopTimer("hydration");
    return assets;
};
