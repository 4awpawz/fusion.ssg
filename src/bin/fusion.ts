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
import type { BuildStrategyOptions } from "../types/types.js";

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
    log(`${chalk.red("fusion")} - fusion.ssg static site generator`);
    log("");
    log(chalk.red("SYNOPSIS"));
    log(`    ${chalk.red("fusion -h | --help")}`);
    log(`    ${chalk.red("fusion -h | --help <command>")}`);
    log(`    ${chalk.red("fusion -v | --version")}`);
    log(`    ${chalk.red("fusion b | build")}`);
    log(`    ${chalk.red("fusion r | release")}`);
    log("");
    log(chalk.red("DESCRIPTION"));
    log(`    ${chalk.red("-h | --help")}\t\t   Displays this help screen.`);
    log(`    ${chalk.red("-h | --help <command>")}  Displays command specific help.`);
    log(`    ${chalk.red("-v | --version")}\t   Displays the version.`);
    log(`    ${chalk.red("b | build")}\t\t   Builds your site for development.`);
    log(`    ${chalk.red("r | release")}\t\t   Builds your site for release.`);
    log("");
};

/**
 * Print command specific help to stdout.
 */

const buildHelp = function() {
    log(`${chalk.red("fusion build")} - Builds your site for development.`);
    log("");
    log(chalk.red("SYNOPSIS"));
    log(`    ${chalk.red("fusion b | build")}`);
    log("");
    log(chalk.red("DESCRIPTION"));
    log(`    Builds your site for development. {baseURL}s are not applied and WIPs are not ignored.`);
    log("");
};

const releaseHelp = function() {
    log(`${chalk.red("fusion release")} - Builds your site for release with optional cache busting.`);
    log("");
    log(chalk.red("SYNOPSIS"));
    log(`    ${chalk.red("fusion r | release")}`);
    log(`    ${chalk.red("fusion r | release --cache-bust")}`);
    log("");
    log(chalk.red("DESCRIPTION"));
    log(`    1st form: Builds your site for release. {baseURL}s are applied and WIPs are ignored.`);
    log(`    2nd form: Builds your site for release with cache busting applied to the content in the build folder. {baseURL}s are applied and WIPs are ignored.`);
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
 * "Guard against commands that act on a project in a folder that isn't one.
 */
const guard = function() {
    const isAProject = fs.existsSync(path.join(process.cwd(), "fusion.json"));
    if (!isAProject && ["b", "build", "r", "release"].includes(commands[0] as string)) {
        log(`This command requires the current working directory to be a fusion project.See 'fusion -h ${commands[0]}' for more information.`);
    }
    if (!isAProject) {
        generalHelp();
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
        const opts = {
            buildStrategy: "DEVELOPMENT",
            cacheBust: false,
            verbose: options.includes("--verbose") ? true : false
        } as BuildStrategyOptions;
        options.includes("--cache-bust") && console.log(chalk.red("ignoring unsupported development build option: \"--cache-bust\""));
        await run(opts);
    },
    invalid: () => buildHelp(),
};

// Build for release.
const releaseCommand = {
    validate: function() {
        return true;
    },
    valid: async () => {
        const opts = {
            buildStrategy: "RELEASE",
            cacheBust: options.includes("--cache-bust") ? true : false,
            verbose: options.includes("--verbose") ? true : false
        } as BuildStrategyOptions;
        await run(opts);
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
