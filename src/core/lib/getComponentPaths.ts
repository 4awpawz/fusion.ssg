import path from "path";
import { getConfiguration } from "../services/configuration/getConfiguration.js";
import { _glob } from "./io/_glob.js";

export const getComponentPaths = async function(): Promise<readonly string[]> {
    const extensions = [".tsx"];
    const configuration = await getConfiguration();
    const paths = (await _glob(path.join(configuration.srcFolder, configuration.componentsFolder, "**/*"))).value as readonly string[];
    const pathsToComponents = paths.filter(_path => extensions.includes(path.parse(_path).ext));
    return pathsToComponents;
};
