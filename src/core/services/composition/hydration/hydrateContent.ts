/**
 * hydrateContent - Calls custom components and replaces their tags with the content they return.
 */

import type { ComponentIdentifier, ComponentsMap, Component, ComponentProfile, Assets, Asset } from "../../../../types/types";
import { join } from "path";
import { config } from "../../configuration/configuration.js";
import { findAndReplaceTokenContent } from "../../../lib/findAndReplaceTokenContent.js";
import { getDataSources } from "../getDataSources.js";
import { importModule } from "../../../lib/importModule.js";
import chalk from "chalk";
import { renderToString } from "preact-render-to-string";

export const hydrateContent = async function(content: string, componentProfiles: ComponentProfile[], componentsMap: ComponentsMap, asset: Asset, assets: Assets): Promise<string | void> {
    const runtimeCWD = join(process.cwd(), config.libFolder);
    const cwd = process.cwd(); // Is restored below.
    for (const componentProfile of componentProfiles) {
        if (componentProfile.componentIsCollection) continue;
        const componentIdentifier: ComponentIdentifier = componentsMap[componentProfile.componentName] as ComponentIdentifier;
        if (typeof componentIdentifier === "undefined") {
            console.error(chalk.red(`there was an error: Component '${componentProfile.componentName}' does not exist.`));
            continue;
        }
        const component = await importModule(componentIdentifier.moduleName, config) as Component;
        if (typeof component === "undefined") {
            console.error(chalk.red(`there was an error: Hydration processing for template '${componentIdentifier.moduleName}' bypassed, unable to import component '${componentIdentifier.moduleName}'`));
            continue;
        }
        let props = componentProfile.componentDataSources.length > 0 &&
            await getDataSources(componentProfile.componentDataSources, config);
        props = { ...props, ...componentProfile.componentProperties, asset, assets, };

        // *Important: Set the cwd to 'cwd/lib' so that component calls to import using relative paths are resolved relative to the lib folder.
        process.chdir(runtimeCWD);
        // Components are always called asynchronously.
        const componentContent = await component(props);
        process.chdir(cwd);
        if (typeof componentContent === "undefined") continue;
        const html = renderToString(componentContent);
        content = findAndReplaceTokenContent(content, componentProfile.componentTag, html);
    }
    return content;
};
