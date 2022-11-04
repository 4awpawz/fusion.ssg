/**
 * getTemplatePathFromFileName - Returns the associated page's path from the asset's file name.
 */

import { parse } from "path";
import { getConfiguration } from "../configuration/getConfiguration.js";

export const getPagePathFromFileName = async function(path: string): Promise<string> {
    const parseReslt = parse(path);
    const srcFolder = (await getConfiguration()).srcFolder;
    if (!parseReslt.name.includes(".")) return "";
    return `${srcFolder}/pages/${parseReslt.name.split(".")[0]?.split("-").join("/") as string}.html`;
};
