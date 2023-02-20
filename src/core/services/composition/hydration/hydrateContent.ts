import type { ComponentIdentifier, ComponentsMap, Component, ComponentProfile } from "../../../../types/types";
import { join } from "path";
import { getConfiguration } from "../../configuration/getConfiguration.js";
import { findAndReplaceTokenContent } from "../../../lib/findAndReplaceTokenContent.js";
import { getDataSources } from "../../../lib/getDataSources.js";
import { importModule } from "../../../lib/importModule.js";
import chalk from "chalk";

export const hydrateContent = async function(content: string, componentProfiles: ComponentProfile[], componentsMap: ComponentsMap): Promise<string | void> {
    const config = await getConfiguration();
    const runtimeCWD = join(process.cwd(), config.libFolder);
    const cwd = process.cwd();
    for (const componentProfile of componentProfiles) {
        const componentIdentifier: ComponentIdentifier = componentsMap[componentProfile.path] as ComponentIdentifier;
        if (typeof componentIdentifier === "undefined") {
            console.error(chalk.red(`there was an error: Component '${componentProfile.path}' does not exist.`));
            continue;
        }
        const component = await importModule(componentIdentifier.modulePath, componentIdentifier.moduleName, config) as Component;
        if (typeof component === "undefined") {
            console.error(chalk.red(`there was an error: hydration processing for template '${componentIdentifier.modulePath}' bypassed, unable to import component '${componentIdentifier.moduleName}'`));
            continue;
        }
        const buffersMap = componentProfile.dataSources.length > 0 ? await getDataSources(componentProfile.dataSources, config) : undefined;
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
