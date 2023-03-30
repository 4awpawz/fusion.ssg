/**
 * collectionGenerator - calls collection components declared in collection templates (identified by the boolean
 * front matter property 'isCollection' when set to true) and uses the content they return to create new documents.
 */

import type { Assets, ComponentProfile, } from "../../../../types/types";
import chalk from "chalk";
import * as metrics from "../../../lib/metrics.js";
import { makeCollection } from "./makeCollection.js";
import { componentPaths } from "../../../lib/getComponentPaths.js";
import { makeComponentsMap } from "../../../lib/makeComponentsMap.js";
import { clearCache } from "../../../lib/cache.js";
import { getComponentProfiles } from "../getComponentProfiles.js";
import { _filter } from "../../../lib/functional.js";

export const collectionGerator = async function(assets: Assets): Promise<Assets> {
    metrics.startTimer("collections");
    if (process.env["OK_TO_CALL_COMPONENTS"] === "0") return assets;
    const componentsMap = makeComponentsMap(componentPaths);
    clearCache();
    for (const asset of assets) {
        if (asset.assetType !== "template" || typeof asset?.fm?.data["isCollection"] === "undefined"
            || !asset?.fm?.data["isCollection"] || typeof asset.fm?.content === "undefined") continue;
        const componentProfiles = _filter(getComponentProfiles(asset.fm?.content as string), item => item.componentIsCollection);
        if (componentProfiles.length !== 1) {
            console.error(chalk.red(`there was an error: Collection processing for template ${asset.filePath} bypassed, a template that declares itself a collection must declare one collection component`));
            continue;
        }
        // Document contains compnents, needs collections.
        await makeCollection(assets, asset, componentProfiles[0] as ComponentProfile, componentsMap);
    }
    metrics.stopTimer("collections");
    return assets;
};
