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

const { __dirname } = fileDirName(import.meta);

const buffer = await _readFile(path.join(__dirname, "..", "..", "package.json"));
const pkgJson = JSON.parse(buffer as string);

/**
 * Get all of the options and normalize combined options, such as from ["-wi]" to ["-w", "-i"].
 */
const options: string[] = [];
process.argv.slice(2)
    .filter(arg => arg[0] === "-")
    .reduce((accum, value) => {
        if (value.startsWith("--")) {
            accum.push(value);
            return accum;
        } else {
            [...value].forEach(item => {
                if (item !== "-") {
                    accum.push(`-${item}`);
                }
            });
            return accum;
        }
    }, options);

/**
 * Get all of the commands and arguments.
 */
const commands = process.argv
    .slice(2)
    // Eliminate all options, both - and --.
    .filter(arg => arg[0] !== "-");

/**
 * Prints generalized help to stdout.
 */
const generalHelp = () => {
    log("");
    log("Usage: yada [option] | yada [command] [args]");
    log("");
    log("where [option] is one of:");
    log("    -v | --version (version)");
    log("    -h | --help (this help)");
    log("");
    log("where [command] is one of:");
    log("    n, new, b, build, r, release, c, cachebust, s, serve, j, json");
    log("");
    log("For command specific help, enter yada -h | --help [command]");
    log("");
};

/**
 * Prints command specific help to stdout.
 */
const commandSpecificHelp = (command: string) => {
    if (command === "b" || command === "build") {
        log("NAME");
        log("       yada-build - Builds your site.");
        log("");
        log("SYNOPSIS");
        log("       yada build");
        log("");
        log("       alias: yada b");
        log("");
        log("DESCRIPTION");
        log("       This command builds your site targeting the build folder.");
        log("");
        log("           yada build");
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
    const isAProject = fs.existsSync(path.join(process.cwd(), "yada.json"));
    if (!isAProject) {
        log(`This command requires the current working directory to be a Yada project. See 'yada -h ${commands[0]}' for more information.`);
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
        log("building");
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
