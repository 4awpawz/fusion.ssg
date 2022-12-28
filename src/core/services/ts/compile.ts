/**
 * compile - Calls the Typescropt compiler api passig it a list of user components and compiler options.
 */

import path from "path";
import ts from "typescript";
import { _glob } from "../../lib/io/_glob.js";
import { getConfiguration } from "../configuration/getConfiguration.js";
import { compiler } from "./compiler.js";

/**
 *  Get a list of all the component files from src/components.
 */

const extensions = [".js", ".jsx", ".tsx"];

const getComponentPaths = async function(): Promise<readonly string[]> {
    const configuration = await getConfiguration();
    const paths = (await _glob(path.join(configuration.srcFolder, configuration.componentsFolder, "**/*"))).value as readonly string[];
    const pathsToComponents = paths.filter(_path => extensions.includes(path.parse(_path).ext));
    return pathsToComponents;
};

const options: ts.CompilerOptions = {
    module: ts.ModuleKind.NodeNext,
    target: ts.ScriptTarget.ES2022,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    rootDir: "src/components",
    outDir: "lib/",
    allowJs: true,
    strict: true,
    jsx: ts.JsxEmit.ReactJSX,
    jsxImportSource: "preact",
    typeRoots: ["node_modules/@types"],
    baseUrl: "./",
    noEmitOnError: true,
    noImplicitAny: true,
};

export const compile = async function(): Promise<number> {
    return compiler(await getComponentPaths(), options);
};
