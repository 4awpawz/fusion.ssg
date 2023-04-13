/**
 * compile - Calls the Typescropt compiler api passig it a list of user components and compiler options.
 */

import ts from "typescript";
import { compiler } from "./compiler.js";
import * as metrics from "../../lib/metrics.js";
import { componentPaths } from "../../lib/getComponentPaths.js";
import chalk from "chalk";
import { fileModifiedTime } from "../../lib/io/fileModifiedTime.js";
import { join } from "path";
import { config } from "../configuration/configuration.js";
import { metaTimeStampFileName } from "../configuration/metaTimeStampFileName.js";
import { _fileExists } from "../../lib/io/_fileExists.js";

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

export const compile = async function(): Promise<boolean> {
    metrics.startTimer("component compilation");
    if (componentPaths.length === 0) {
        console.log(chalk.blue("no components found"));
        process.env["OK_TO_CALL_COMPONENTS"] = "0";
        metrics.stopTimer("compilation");
        return true;
    }

    const metaTimeStampFilePath = join(process.cwd(), config.metaFolder, metaTimeStampFileName);
    const metaTimeStamp = _fileExists(metaTimeStampFilePath) ? await fileModifiedTime(metaTimeStampFilePath) : 0;
    let componentIsStale = false;
    for (const componentPath of componentPaths) {
        const mtimems = await fileModifiedTime(componentPath);
        if (mtimems > metaTimeStamp) {
            componentIsStale = true;
            break;
        }
    }

    if (!componentIsStale) {
        console.log(chalk.blue("nothing to compile, all components are clean"));
        process.env["OK_TO_CALL_COMPONENTS"] = "1";
        metrics.stopTimer("component compilation");
        return true;
    }

    const exitCode = compiler(componentPaths, options);
    if (exitCode === 1) {
        console.error(chalk.red("there was an error: TypeScript found errors in one or more components that need to be addressed."));
        process.env["OK_TO_CALL_COMPONENTS"] = "0";
        metrics.stopTimer("compilation");
        return false;
    }

    process.env["OK_TO_CALL_COMPONENTS"] = "1";
    metrics.stopTimer("component compilation");
    return true;
};
