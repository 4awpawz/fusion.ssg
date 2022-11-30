/**
 * Compiles user's components using the Typescript compiler.
 * See https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
 */

import path from "path";
import ts from "typescript";
import { _glob } from "../../lib/io/_glob.js";
import { getConfiguration } from "../configuration/getConfiguration.js";

/**
 *  Get a list of all the component files from src/components.
 */

const extensions = [".js", ".jsx", ".tsx"];

const getCompilerTargets = async function(): Promise<readonly string[]> {
    const configuration = await getConfiguration();
    const paths = (await _glob(path.join(configuration.srcFolder, configuration.componentsFolder, "**/*"))).value as readonly string[];
    const pathsToComponents = paths.filter(_path => extensions.includes(path.parse(_path).ext));
    return pathsToComponents;
};

const defaultCompilerOptions: ts.CompilerOptions = {
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

/**
 * Compile users' components.
 */

// TODO: 22/11/24 16:18:43 - jeffreyschwartz : Compiler options should be passed or set to a default.
export const compile = async function(fileNames: readonly string[] | undefined, options: ts.CompilerOptions | undefined): Promise<void> {
    // file names could be resolved from fileNames or discovered using glob.
    const _fileNames = typeof fileNames !== "undefined" ? fileNames : await getCompilerTargets();
    // options could be passsed or set to defaultCompilerOptions.
    const _options = typeof options !== "undefined" ? options : defaultCompilerOptions;
    const program = ts.createProgram(_fileNames, _options);
    const emitResult = program.emit();

    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    const exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Typescript Process exiting with code '${exitCode}'.`);
};
