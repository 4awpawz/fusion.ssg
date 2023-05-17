/**
 * makeComponentsMap - returns a ComponentsMap.
 */

import { parse } from "path";
import type { ComponentIdentifier, ComponentsMap } from "../../types/types";

export const makeComponentsMap = function(componentPaths: readonly string[]): ComponentsMap {
    const componentsMap: ComponentsMap = {};
    for (const itemPath of componentPaths) {
        const componentName = parse(itemPath).name;
        const componentExt = ".js"; // Not currently used but maybe will be when allowing JSX components.
        const componentIdentifier: ComponentIdentifier = { moduleName: componentName + componentExt };
        componentsMap[componentName] = componentIdentifier;
    }
    return componentsMap;
};
