/**
 * getTemplatePathFromFileName - Returns the associated template's path from the asset's file name.
 */

import { parse } from "path";
import { getConfiguration } from "../configuration/getConfiguration.js";

export const getTemplatePathFromFileName = async function(path: string): Promise<string> {
    const parseReslt = parse(path);
    const srcFolder = (await getConfiguration()).projectStructure.srcFolder;
    if (!parseReslt.name.includes(".")) return "";
    return `${srcFolder}/templates/${parseReslt.name.split(".")[0]?.split("-").join("/") as string}.html`;
};
