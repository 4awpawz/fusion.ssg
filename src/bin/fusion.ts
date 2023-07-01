#!/usr/bin/env node

/**
 * Command line options are specified following the GNU specification
 * (see http://www.catb.org/~esr/writings/taoup/html/ch10s05.html for details).
 */

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
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
 * Print generalized help to stdout.
 */

const generalHelp = () => {
    log(chalk.red("NAME"));
    log(`    ${chalk.red("fusion")} - fusion.ssg static site generator`);
    log("");
    log(chalk.red("SYNOPSIS"));
    log(`    ${chalk.red("fusion [ -v | --version ]")}`);
    log(`    ${chalk.red("fusion [ -h | --help ]")}`);
    log(`    ${chalk.red("fusion [ b | build ]")}`);
    log(`    ${chalk.red("fusion [ r | release ]")}`);
    log("");
    log(chalk.red("DESCRIPTION"));
    log(`    ${chalk.red("[ -v | --version ]")} Displays the version.`);
    log(`    ${chalk.red("[ -h | --help ]")} Displays general help.`);
    log(`    ${chalk.red("[ b | build ]")} Builds your site for development.`);
    log(`    ${chalk.red("[ r | release ]")} Builds your site for release.`);
    log("");
    log(`For command specific help, enter ${chalk.red("fusion [ -h | --help ] [command]")}`);
    log("");
};

/**
 * Print command specific help to stdout.
 */

const buildHelp = function() {
    log(chalk.red("NAME"));
    log(`       ${chalk.red("fusion build")} - Builds your site for development.`);
    log("");
    log(chalk.red("SYNOPSIS"));
    log(`    ${chalk.red("fusion [ b | build ]")}`);
    log("");
    log(chalk.red("DESCRIPTION"));
    log(`    ${chalk.red("[ b | build ]")} Builds your site for development. ${chalk.red("baseURL")}s are not applied and ${chalk.red("WIP")}s are not ignored.`);
    log("");
};

const releaseHelp = function() {
    log(chalk.red("NAME"));
    log(`       ${chalk.red("fusion release")} - Builds your site for release.`);
    log("");
    log(chalk.red("SYNOPSIS"));
    log(`    ${chalk.red("fusion [ r | release ]")}`);
    log("");
    log(chalk.red("DESCRIPTION"));
    log(`    ${chalk.red("[ r | release ]")} Builds your site for release. ${chalk.red("baseURL")}s are applied and ${chalk.red("WIP")}s are ignored.`);
    log("");
};

const commandSpecificHelp = (command: string) => {
    switch (command) {
        case "b":
        case "build":
            buildHelp();
            break;
        case "r":
        case "release":
            releaseHelp();
            break;
        default:
            generalHelp();
    }
};

/**
 * "Guard against commands that act on a project but which are issued in a folder that doesn't contain one.
 */
const guard = function() {
    const isAProject = fs.existsSync(path.join(process.cwd(), "fusion.json"));
    if (!isAProject) {
        log(`This command requires the current working directory to be a fusion project.See 'fusion -h ${commands[0]}' for more information.`);
        log("");
        process.exit();
    }
};

/**
 * Command validation and execution.
 */

// Build for development.
const buildCommand = {
    validate: function() {
        return true;
    },
    valid: async () => {
        await run("DEVELOPMENT");
    },
    invalid: () => buildHelp(),
};

// Build for release.
const releaseCommand = {
    validate: function() {
        return true;
    },
    valid: async () => {
        await run("RELEASE");
    },
    invalid: () => releaseHelp(),
};

const commandHandlers = new Map();
commandHandlers.set("build", buildCommand);
commandHandlers.set("b", buildCommand);
commandHandlers.set("release", releaseCommand);
commandHandlers.set("r", releaseCommand);

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

    const isNew = ["n", "new"].includes(commands[0] as string);
    !isNew && guard();

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
