/**
 * makeComponentsMap - returns a ComponentsMap.
 */

import { join, parse } from "path";
import type { ComponentIdentifier, ComponentsMap } from "../../types/types";

export const makeComponentsMap = function(componentPaths: readonly string[]): ComponentsMap {
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
