/**
 * Generator - calls collection components declared in collection templates (identified by the boolean
 * front matter property 'isCollection' when set to true) and uses the content they return to create new documents.
 */

import type { Asset, Assets, CollectionComponent, CollectionPageProfile, ComponentIdentifier, ComponentProfile, ComponentsMap, Token } from "../../../../types/types";
import * as metrics from "../../../lib/metrics.js";
import { componentPaths } from "../../../lib/getComponentPaths.js";
import { makeComponentsMap } from "../../../lib/makeComponentsMap.js";
import { clearCache } from "../../../lib/cache.js";
import { getComponentProfilesFromTokens } from "../../../lib/getComponentProfilesFromTokens.js";
import { getConfiguration } from "../../configuration/getConfiguration.js";
import { join, parse } from "path";
import chalk from "chalk";
import { importModule } from "../../../lib/importModule.js";
import { getDataSources } from "../../../lib/getDataSources.js";

const makeNewAsset = function(asset: Asset, collectionPageProfile: CollectionPageProfile, token: Token): Asset {
    const newAsset: Asset = JSON.parse(JSON.stringify(asset));
    delete newAsset?.fm?.data["isCollection"];
    newAsset.content = newAsset.content?.replace("{title}", collectionPageProfile.title) as string;
    newAsset.content = newAsset.content?.replace(`{{{{${token}}}}}`, collectionPageProfile.content);
    //html document name
    const htmlDocumentPath = parse(asset.filePath).dir.split("/").slice(2).join("/");
    newAsset.htmlDocumentName = join(htmlDocumentPath, collectionPageProfile.htmlDocumentName, "index.html");
    return newAsset;
};

const makeCollection = async function(assets: Assets, asset: Asset, componentProfile: ComponentProfile, componentsMap: ComponentsMap): Promise<void> {
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
    const buffersMap = componentProfile.dataSources.length > 0 ? await getDataSources(componentProfile.dataSources, config) : undefined;
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

export const collectionGerator = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("collections");
    if (process.env["OK_TO_CALL_COMPONENTS"] === "0") return assets;
    const componentsMap = makeComponentsMap(componentPaths);
    clearCache();
    for (const asset of assets) {
        if (asset.assetType !== "template" || typeof asset?.fm?.data["isCollection"] === "undefined"
            || !asset?.fm?.data["isCollection"] || typeof asset.fm?.content === "undefined") continue;
        const componentProfiles = getComponentProfilesFromTokens(asset.fm?.content as string, "fourBraces");
        if (componentProfiles.length !== 1) {
            console.error(chalk.red(`there was an error: collection processing for template ${asset.filePath} bypassed, a template that declares itself a collection must declare one collection component`));
            continue;
        }
        // Document contains compnents, needs collections.
        await makeCollection(assets, asset, componentProfiles[0] as ComponentProfile, componentsMap);
    }
    metrics.stopTimer("collections");
    return assets;
};
