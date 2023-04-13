/**
 * getPostOutPath - Returns the output path for a post.
 */

import chalk from "chalk";
import { join, parse } from "path";
import { config } from "../configuration/configuration.js";
import { isPostDateValid } from "./isPostDateValid.js";

const outErrorMessage = function(path: string): void {
    console.log(chalk.red(`there was an error: File name for post ${path} must be of the form: "yyyy-mm-dd-filename.[html|md]"`));
    console.log(chalk.red(`and "yyyy-mm-dd" must resolve to a valid date`));
};

export const getPostOutPath = async function(path: string, postCategoriesPath: string | undefined): Promise<string | undefined> {
    const pathParts = parse(path);
    const postDateFound = /(\d{4})-(\d{2})-(\d{2})/.test(pathParts.name);
    if (!postDateFound) {
        outErrorMessage(path);
        return;
    }
    // validate article file name date
    const parts = pathParts.name.substring(0, 10).split("-");
    const yyyy = Number(parts[0]);
    const mm = Number(parts[1]);
    const dd = Number(parts[2]);
    if (isNaN(yyyy) || isNaN(mm) || isNaN(dd) || !isPostDateValid(mm, dd, yyyy)) {
        outErrorMessage(path);
        return;
    }
    const postsPath = typeof postCategoriesPath !== "undefined" ?
        join(config.userConfig.postsFolder, postCategoriesPath) : config.userConfig.postsFolder;
    const yyyyPath = yyyy.toString();
    const mmPath = mm.toString().padStart(2, "0");
    const ddPath = dd.toString().padStart(2, "0");
    const outPath = join("/", postsPath, yyyyPath, mmPath, ddPath);
    return outPath;
};
