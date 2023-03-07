/**
 * makeCollection - Makes a copy of the original collection template, calls the collection component
* for each copy to contribute content to the page and stores the copied asset to assets.
 */

import type { Asset, Assets, CollectionComponent, CollectionPageProfile, ComponentIdentifier, ComponentProfile, ComponentsMap } from "../../../../types/types";
import { join } from "path";
import chalk from "chalk";
import { makeNewAsset } from "./makeNewAsset.js";
import { getConfiguration } from "../../configuration/getConfiguration.js";
import { importModule } from "../../../lib/importModule.js";
import { getDataSources } from "../../../lib/getDataSources.js";

export const makeCollection = async function(assets: Assets, asset: Asset, componentProfile: ComponentProfile, componentsMap: ComponentsMap): Promise<void> {
    const config = await getConfiguration();
    const runtimeCWD = join(process.cwd(), config.libFolder);
    const cwd = process.cwd();
    const componentIdentifier: ComponentIdentifier = componentsMap[componentProfile.path] as ComponentIdentifier;
    if (typeof componentIdentifier === "undefined") {
        console.error(chalk.red(`there was an error: Collection Component '${componentProfile.path}' does not exist.`));
        return;
    }
    const collectionComponent = await importModule(componentIdentifier.modulePath, componentIdentifier.moduleName, config) as CollectionComponent;
    if (typeof collectionComponent === "undefined") {
        console.error(chalk.red(`there was an error: Unable to import '${componentIdentifier.moduleName}' from '${componentIdentifier.modulePath}'.`));
        return;
    }
    const buffersMap = { ...componentProfile.dataSources.length > 0 ? await getDataSources(componentProfile.dataSources, config) : undefined, assets };
    // *Important: Set the cwd to 'cwd/lib' so that component calls to import using relative paths are resolved relative to the lib folder.
    process.chdir(runtimeCWD);
    // The component may possible need an index for each call.
    let index = 0;
    const condition = true;
    while (condition) {
        // Components are always called asynchronously.
        const collectionPageProfile = (typeof buffersMap !== "undefined" ? await collectionComponent(index, buffersMap) : await collectionComponent(index)) as CollectionPageProfile;
        // Collection components return undefined when there's nothing more to process.
        if (typeof collectionPageProfile === "undefined") break;
        const generatedAsset = makeNewAsset(asset, collectionPageProfile, componentProfile.token);
        assets.push(generatedAsset);
        index += 1;
    }
    process.chdir(cwd);
    return;
};