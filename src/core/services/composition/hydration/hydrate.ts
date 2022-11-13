/**
 * Compose - Hydrate pages using components.
 */

import { join, parse } from "path";
import type { Assets, ComponentIdentifier, ComponentsMap, Component } from "../../../../types/types";
import { hydrateContent } from "./hydrateContent.js";
import { _glob } from "../../../lib/io/_glob.js";
import { getConfiguration } from "../../configuration/getConfiguration.js";

const config = (await getConfiguration());

const getComponentPaths = async function(): Promise<string[] | Error> {
    const componentsPath = join(config.srcFolder, config.componentsFolder, "**/", "{*.js,*.jsx,*.ts,*.tsx}");
    const result = await _glob(componentsPath);
    return result.value;
};

const makeComponentsMap = function(result: string[]): ComponentsMap {
    const componentsMap: ComponentsMap = {};
    for (const itemPath of result) {
        // Remove 'src/' from the path.
        const componentPath = join(parse(itemPath).dir.split("/").slice(2).join("/"), parse(itemPath).base);
        const componentName = parse(itemPath).name;
        const componentExt = ".js";
        const componentIdentifier: ComponentIdentifier = { modulePath: join(parse(componentPath).dir, componentName + componentExt), moduleName: componentName };
        componentsMap[componentPath] = componentIdentifier;
    }
    return componentsMap;
};

const getPathsFromComponentTokens = function(assetContent: string): string[] {
    const regex = /\{(.*?)\}/g;
    const matches = assetContent.matchAll(regex);
    if (typeof matches === "undefined") return [];
    const _matches = [...matches];
    const paths: string[] = [];
    for (const match of _matches) {
        if (typeof match[1] === "undefined") continue;
        paths.push(match[1]);
    }
    return paths;
};

export const hydrate = async function(assets: Assets): Promise<Assets> {
    const componentPaths = await getComponentPaths();
    if (componentPaths instanceof Error) {
        console.error(componentPaths);
        console.error(`there was an error: glob failed when searching for components`);
        throw componentPaths;
    }
    if (componentPaths.length === 0) return assets;
    const componentsMap = makeComponentsMap(componentPaths);
    for (const _asset of assets) {
        if (_asset.assetType !== "template") continue;
        const componentTokensPaths = getPathsFromComponentTokens(_asset.content);
        if (componentTokensPaths.length === 0) continue;
        // Document contains compnents, needs hydration.
        const hydratedContent = await hydrateContent(_asset.content, componentTokensPaths, componentsMap);
        _asset.content = hydratedContent;
    }
    return assets;
};
