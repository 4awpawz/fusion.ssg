/**
 * Compiles user's components and browser scripts using the Typescript compiler api.
 * See https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
 */

import chalk from "chalk";
import ts from "typescript";
import { _forEach } from "../../lib/functional.js";

export const compiler = function(paths: readonly string[], options: ts.CompilerOptions): number {
    const program = ts.createProgram(paths, options);
    const emitResult = program.emit();

    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    _forEach(allDiagnostics, diagnostic => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start as number);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(chalk.red(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`));
        } else {
            console.log(chalk.red(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")));
        }
    });

    const exitCode = emitResult.emitSkipped ? 1 : 0;
    const message = `Typescript Compilation Process exited with code '${exitCode}'`;
    exitCode === 0 ? console.log(chalk.blue(message)) : console.log(chalk.red(message));
    return exitCode;
};
