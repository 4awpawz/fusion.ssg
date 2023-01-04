import type { ComponentIdentifier, ComponentsMap, Component, ComponentProfile } from "../../../../types/types";
import { join } from "path";
import { getConfiguration } from "../../configuration/getConfiguration.js";
import { findAndReplaceTokenContent } from "../../../lib/findAndReplaceTokenContent.js";
import { getDataSources } from "./getDataSources.js";

const config = (await getConfiguration());

const importModule = async function(modulePath: string, moduleName: string): Promise<Component> {
    // Dynamic import returns promise.
    let component;
    try {
        const _modulePath = join(process.cwd(), config.libFolder, modulePath);
        component = await import(_modulePath).then(module => module[moduleName]);
    } catch (error) {
        console.error(`there was an error when dynamically IMPORTing component module ${modulePath}`);
        throw error;
    }
    return component;
};

export const hydrateContent = async function(content: string, componentProfiles: ComponentProfile[], componentsMap: ComponentsMap): Promise<string | void> {
    const runtimeCWD = join(process.cwd(), config.libFolder);
    const cwd = process.cwd();
    for (const componentProfile of componentProfiles) {
        const componentIdentifier: ComponentIdentifier = componentsMap[componentProfile.path] as ComponentIdentifier;
        if (typeof componentIdentifier === "undefined") {
            console.error(`there was an error: Component '${componentProfile}' does not exist.`);
            continue;
        }
        const component: Component = await importModule(componentIdentifier.modulePath, componentIdentifier.moduleName);
        if (typeof component === "undefined") {
            console.error(`there was an error: Unable to import '${componentIdentifier.moduleName}' from '${componentIdentifier.modulePath}'.`);
            continue;
        }
        const buffersMap = componentProfile.dataSources.length > 0 ? await getDataSources(componentProfile.dataSources) : undefined;
        // *Important: Set the cwd to 'cwd/lib' so that component calls to import using relative paths are resolved relative to the lib folder.
        process.chdir(runtimeCWD);
        // Components are always called asynchronously.
        const componentContent = typeof buffersMap !== "undefined" ? await component(buffersMap) : await component();
        process.chdir(cwd);
        if (typeof componentContent === "undefined") continue;
        content = findAndReplaceTokenContent(content, `{{{${componentProfile.token}}}}`, componentContent);
    }
    return content;
};
