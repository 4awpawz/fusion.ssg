import type { ComponentIdentifier, ComponentsMap, Component } from "../../../../types/types";
import { join } from "path";
import { getConfiguration } from "../../configuration/getConfiguration.js";
import { findAndReplaceTokenContent } from "../../../lib/token/findAndReplaceTokenContent.js";

const config = (await getConfiguration());

const getComponent = async function(modulePath: string, moduleName: string): Promise<Component> {
    // Dynamic import returns promise.
    let component;
    try {
        const _modulePath = join(process.cwd(), config.libFolder, modulePath);
        component = await import(_modulePath).then(module => module[moduleName]);
    } catch (error) {
        return undefined;
    }
    return component;
};

export const hydrateContent = async function(content: string, componentTokensPaths: string[], componentsMap: ComponentsMap): Promise<string> {
    for (const componentTokenPath of componentTokensPaths) {
        const componentIdentifier: ComponentIdentifier = componentsMap[componentTokenPath] as ComponentIdentifier;
        const component: Component = await getComponent(componentIdentifier.modulePath, componentIdentifier.moduleName);
        if (typeof component === "undefined") return content;
        const componentContent = component();
        if (typeof componentContent === "undefined") return content;
        console.log("hydrated content:", componentContent);
        console.log("componentTokenPath", componentTokenPath);
        content = findAndReplaceTokenContent(content, componentTokenPath, componentContent);
    }
    return content;
};
