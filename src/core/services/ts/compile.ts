/**
 * compile - Calls the Typescropt compiler api passig it a list of user components and compiler options.
 */

import ts from "typescript";
import { compiler } from "./compiler.js";
import * as metrics from "../../lib/metrics.js";
import { getComponentPaths } from "../../lib/getComponentPaths.js";

/**
 *  Get a list of all the component files from src/components.
 */

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

export const compile = async function(): Promise<void> {
    metrics.startTimer("compilation");
    const componentPaths = await getComponentPaths();
    if (componentPaths.length === 0) {
        console.log("no components found");
        process.env["OK_TO_CALL_COMPONENTS"] = "0";
        return;
    }
    const exitCode = compiler(componentPaths, options);
    if (exitCode === 1) {
        console.error(`there was an error: TypeScript found errors in one or more components that need to be addressed.`);
        process.env["OK_TO_CALL_COMPONENTS"] = "0";
        return;
    }
    process.env["OK_TO_CALL_COMPONENTS"] = "1";
    metrics.stopTimer("compilation");
};
