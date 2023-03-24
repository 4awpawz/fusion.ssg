#!/usr/bin/env node

/**
 * Command line options are specified following the GNU specification
 * (see http://www.catb.org/~esr/writings/taoup/html/ch10s05.html for details).
 */

import fs from "fs-extra";
import path from "path";
import { _readFile } from "../core/lib/io/_readFile.js";
import { log } from "../core/lib/io/log.js";
import { run } from "../index.js";
import fileDirName from "../core/lib/fileDirName.js";
import { _forEach, _filter, _reduce } from "../core/lib/functional.js";

const { __dirname } = fileDirName(import.meta);

const buffer = await _readFile(path.join(__dirname, "..", "..", "package.json"));
const pkgJson = JSON.parse(buffer as string);

/**
 * Get all of the options and normalize combined options, such as from ["-wi]" to ["-w", "-i"].
 */
const optionsFilterFn = (arg: string) => arg[0] === "-";
const optionsReduceFn = ((previousValue: string[], value: string): string[] => {
    if (value.startsWith("--")) {
        previousValue.push(value);
        return previousValue;
    } else {
        _forEach([...value], item => {
            if (item !== "-") {
                previousValue.push(`-${item}`);
            }
        });
        return previousValue;
    }
});
const options = _reduce(_filter(process.argv.slice(2), optionsFilterFn), optionsReduceFn, [] as string[]);

/**
 * Get all of the commands and arguments.
 */
const commands = _filter(process.argv.slice(2), arg => arg[0] !== "-");

/**
 * Prints generalized help to stdout.
 */
const generalHelp = () => {
    log("");
    log("Usage: fusion [option] | fusion [command] [args]");
    log("");
    log("where [option] is one of:");
    log("    -v | --version (version)");
    log("    -h | --help (this help)");
    log("");
    log("where [command] is one of:");
    log("    n, new, b, build, r, release, c, cachebust, s, serve, j, json");
    log("");
    log("For command specific help, enter fusion -h | --help [command]");
    log("");
};

/**
 * Prints command specific help to stdout.
 */
const commandSpecificHelp = (command: string) => {
    if (command === "b" || command === "build") {
        log("NAME");
        log("       fusion-build - Builds your site.");
        log("");
        log("SYNOPSIS");
        log("       fusion build");
        log("");
        log("       alias: fusion b");
        log("");
        log("DESCRIPTION");
        log("       This command builds your site targeting the build folder.");
        log("");
        log("           fusion build");
        log("");
        log("       In the first form, it builds your entire site.");
        log("");
        return;
    }
    generalHelp();
};

/**
 * "Guard against commands that act on a project but which are issued in a folder that doesn't contain one.
 */
const guard = function() {
    const isAProject = fs.existsSync(path.join(process.cwd(), "fusion.json"));
    if (!isAProject) {
        log(`This command requires the current working directory to be a fusion project. See 'fusion -h ${commands[0]}' for more information.`);
        log("");
        process.exit();
    }
};

/**
 * Command validation and execution.
 */

const buildCommand = {
    validate: function() {
        return true;
    },
    valid: async () => {
        await run();
    },
    invalid: () => generalHelp(),
};

const commandHandlers = new Map();
commandHandlers.set("build", buildCommand);
commandHandlers.set("b", buildCommand);

/**
 * Command runner.
 */
const commandRunner = async function() {
    if (commands.length === 0 && options[0] === "-v" || options[0] === "--version") {
        log(pkgJson.version);
        return;
    }
    if (options[0] === "-h" || options[0] === "--help") {
        if (commands[0]) {
            commandSpecificHelp(commands[0]);
        } else {
            generalHelp();
        }
        return;
    }
    guard();
    const commandParams = commandHandlers.get(commands[0]);
    if (commandParams) {
        if (commandParams.validate({ commands, options })) {
            await commandParams.valid({ commands, options });
        } else {
            commandParams.invalid();
        }
    } else {
        generalHelp();
    }
};

/**
 * Call the command runner.
 */
await commandRunner();
