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
import { newTypeScriptProjectGenerator as newProject } from "@4awpawz/fusion-typescript-project-generator";

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
 * Print command specific help to stdout.
 */

const buildHelp = function() {
    log("NAME");
    log("       fusion-build - Builds your site for development.");
    log("");
    log("SYNOPSIS");
    log("       fusion build");
    log("");
    log("       alias: fusion b");
    log("");
    log("DESCRIPTION");
    log("       This command builds your site for development targeting the build folder.");
    log("");
    log("           fusion build");
    log("");
    log("       In the first form, it builds your entire site.");
    log("");
};

const releaseHelp = function() {
    log("NAME");
    log("       fusion-release - Builds your site for release.");
    log("");
    log("SYNOPSIS");
    log("       fusion release");
    log("");
    log("       alias: fusion r");
    log("");
    log("DESCRIPTION");
    log("       This command builds your site for release targeting the release folder.");
    log("");
    log("           fusion release");
    log("");
    log("       In the first form, it builds your entire site.");
    log("");
};

const newProjectHelp = function() {
    log("NAME");
    log("       fusion-new-typescript-project - Creates a new TypeScript project in the current folder.");
    log("");
    log("SYNOPSIS");
    log("       fusion new");
    log("");
    log("       alias: fusion n");
    log("");
    log("DESCRIPTION");
    log("       This command creates a new TypeScript project in the current folder.");
    log("       This command will fail if a folder of the same name already exists in the current folder.");
    log("");
    log("           fusion new [project name]");
    log("");
    log("       In the first form, a new TypeScript project is created in a folder named [project name]");
    log("       along with all its dependencies.");
    log("");
};

const commandSpecificHelp = (command: string) => {
    switch (command) {
        case "b":
        case "build":
            buildHelp();
            break;
        case "n":
        case "new":
            newProjectHelp();
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
        log(`This command requires the current working directory to be a fusion project. See 'fusion -h ${commands[0]}' for more information.`);
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

// Build for release.
const newTypeScriptProject = {
    validate: function({ commands }: { commands: string[] }) {
        if (typeof commands[1] as string === "undefined" || commands[1] === "") return false;
        return true;
    },
    valid: async ({ commands }: { commands: string[] }) => {
        await newProject(commands[1] as string);
    },
    invalid: () => newProjectHelp(),
};

const commandHandlers = new Map();
commandHandlers.set("new", newTypeScriptProject);
commandHandlers.set("n", newTypeScriptProject);
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
