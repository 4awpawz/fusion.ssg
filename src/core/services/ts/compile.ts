/**
 * compile - Calls the Typescropt compiler api passig it a list of user components and compiler options.
 */

import ts from "typescript";
import { compiler } from "./compiler.js";
import * as metrics from "../../lib/metrics.js";
import { componentPaths } from "../../lib/getComponentPaths.js";
import { browserScriptsPaths } from "../../lib/getBrowserScriptsPaths.js";
import chalk from "chalk";
import { fileModifiedTime } from "../../lib/io/fileModifiedTime.js";
import { join } from "path";
import { config } from "../configuration/configuration.js";
import { metaTimeStampFileName } from "../configuration/metaTimeStampFileName.js";
import { _fileExists } from "../../lib/io/_fileExists.js";

const browserScriptsCompilerOptions: ts.CompilerOptions = {
    module: ts.ModuleKind.None,
    target: ts.ScriptTarget.ES2022,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    rootDir: "src/scripts",
    outDir: "build/scripts",
    allowJs: true,
    strict: true,
    baseUrl: "./",
    noEmitOnError: true,
    noImplicitAny: true,
};

const componentCompilerOptions: ts.CompilerOptions = {
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

const metaTimeStampFilePath = join(process.cwd(), config.metaFolder, metaTimeStampFileName);
const metaTimeStamp = _fileExists(metaTimeStampFilePath) ? await fileModifiedTime(metaTimeStampFilePath) : 0;

export const compileBrowserScripts = async function(): Promise<boolean> {
    metrics.startTimer("browser scripts compilation");
    if (browserScriptsPaths.length === 0) {
        console.log(chalk.blue("no browser scripts found"));
        metrics.stopTimer("browser scripts compilation");
        return true;
    }

    let scriptIsStale = false;
    for (const browserScriptPath of browserScriptsPaths) {
        const mtimems = await fileModifiedTime(browserScriptPath);
        if (mtimems > metaTimeStamp) {
            scriptIsStale = true;
            break;
        }
    }

    if (!scriptIsStale) {
        console.log(chalk.blue("browser scripts are clean, nothing to compile"));
        metrics.stopTimer("browser scripts compilation");
        return true;
    }

    const exitCode = compiler(browserScriptsPaths, browserScriptsCompilerOptions);
    const message = `browser sripts compilation process exited with code '${exitCode}'`;
    exitCode === 0 ? console.log(chalk.blue(message)) : console.log(chalk.red(message));
    if (exitCode === 1) {
        console.error(chalk.red("there was an error: TypeScript found errors in one or more browser scripts that need to be addressed."));
        metrics.stopTimer("browser scripts compilation");
        return false;
    }

    metrics.stopTimer("browser scripts compilation");
    return true;
};

export const compileComponents = async function(): Promise<boolean> {
    metrics.startTimer("component compilation");
    if (componentPaths.length === 0) {
        console.log(chalk.blue("no components found"));
        process.env["OK_TO_CALL_COMPONENTS"] = "0";
        metrics.stopTimer("component compilation");
        return true;
    }

    let componentIsStale = false;
    for (const componentPath of componentPaths) {
        const mtimems = await fileModifiedTime(componentPath);
        if (mtimems > metaTimeStamp) {
            componentIsStale = true;
            break;
        }
    }

    if (!componentIsStale) {
        console.log(chalk.blue("components are clean, nothing to compile"));
        process.env["OK_TO_CALL_COMPONENTS"] = "1";
        metrics.stopTimer("component compilation");
        return true;
    }

    const exitCode = compiler(componentPaths, componentCompilerOptions);
    const message = `components compilation process exited with code '${exitCode}'`;
    exitCode === 0 ? console.log(chalk.blue(message)) : console.log(chalk.red(message));
    if (exitCode === 1) {
        console.error(chalk.red("there was an error: TypeScript found errors in one or more components that need to be addressed."));
        process.env["OK_TO_CALL_COMPONENTS"] = "0";
        metrics.stopTimer("component compilation");
        return false;
    }

    process.env["OK_TO_CALL_COMPONENTS"] = "1";
    metrics.stopTimer("component compilation");
    return true;
};
