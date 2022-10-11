/**
 * getTemplatePathFromFileName - Returns the associated template's path from the asset's file name.
 */

import { parse } from "path";
import { config } from "../configuration/config.js";

const srcFolder = config.projectStructure.srcFolder;

export const getTemplatePathFromFileName = function(path: string): string {
    const parseReslt = parse(path);
    if (!parseReslt.name.includes(".")) return "";
    return `${srcFolder}/templates/${parseReslt.name.split(".")[0]?.split("-").join("/") as string}.html`;
};
