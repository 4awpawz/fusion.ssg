/**
 * makeCollection - Makes a copy of the original collection template, calls the collection component
 * for each copy to contribute content to the page and stores the copied asset to assets.
 */

import type { Asset, Assets, CollectionComponent, ComponentIdentifier, ComponentProfile, ComponentsMap } from "../../../../types/types.js";
import { join } from "path";
import chalk from "chalk";
import { makeNewAsset } from "./makeNewAsset.js";
import { config } from "../../configuration/configuration.js";
import { importModule } from "../../../lib/importModule.js";
import { getDataSources } from "../getDataSources.js";

export const makeCollection = async function(assets: Assets, asset: Asset, componentProfile: ComponentProfile, componentsMap: ComponentsMap): Promise<void> {
    const runtimeCWD = join(process.cwd(), config.libFolder);
    const cwd = process.cwd();
    const componentIdentifier: ComponentIdentifier = componentsMap[componentProfile.componentName] as ComponentIdentifier;
    if (typeof componentIdentifier === "undefined") {
        console.error(chalk.red(`there was an error: Collection component '${componentProfile.componentName}' does not exist.`));
        return;
    }
    const collectionComponent = await importModule((componentIdentifier.moduleName), config) as CollectionComponent;
    if (typeof collectionComponent === "undefined") {
        console.error(chalk.red(`there was an error: Unable to import '${componentIdentifier.moduleName}' from '${componentIdentifier.moduleName}'.`));
        return;
    }
    let props = componentProfile.componentDataSources.length > 0 && await getDataSources(componentProfile.componentDataSources, config);
    props = { ...props, ...componentProfile.componentProperties, asset, assets };

    // *Important: Set the cwd to 'cwd/lib' so that component calls to import using relative paths are resolved relative to the lib folder.
    process.chdir(runtimeCWD);
    // The component may possible need an index for each call.
    let index = 0;
    const condition = true;
    while (condition) {
        // Components are always called asynchronously.
        props["index"] = index;
        const collectionPageProfile = await collectionComponent(props);
        // Collection components return undefined when there's nothing more to process.
        if (typeof collectionPageProfile === "undefined") break;
        const generatedAsset = makeNewAsset(asset, collectionPageProfile, componentProfile.componentTag, componentProfile.componentName);
        assets.push(generatedAsset);
        index += 1;
    }
    process.chdir(cwd);
    return;
};
