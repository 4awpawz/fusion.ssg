/**
 * Compiles user's components using the Typescript compiler api.
 * See https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API
 */

import ts from "typescript";

export const compiler = function(pathsToComponents: readonly string[], options: ts.CompilerOptions): void {
    const program = ts.createProgram(pathsToComponents, options);
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
    console.log(`Typescript Compilation Process exited with code '${exitCode}'.`);
};
