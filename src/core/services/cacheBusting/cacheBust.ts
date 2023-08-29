/**
 * cacheBust - Cache busts the release build folder.
 */

import path from "path";
import buster from "@4awpawz/buster";
import * as metrics from "../../lib/metrics.js";
import { config } from "../../services/configuration/configuration.js";

export const cacheBust = async function(): Promise<void> {
    metrics.startTimer("cache busting");
    const releaseFolder = "build";
    const baseURL = typeof config.userConfig.baseURL !== "undefined" && config.userConfig.baseURL || "";
    const targetPath = path.join(releaseFolder, baseURL);
    const opts = { verbose: false, manifest: true };
    await buster({
        options: opts,
        directives: [
            `${path.join(targetPath, "media")}/**/*.*:1`,
            `${path.join(targetPath, "css")}/**/*.map:1`,
            `${path.join(targetPath, "scripts")}/**/*.map:1`,
            `${targetPath}/**/*.html:2`,
            `${path.join(targetPath, "css")}/**/*.css:3`,
            `${path.join(targetPath, "scripts")}/**/*.js:3`
        ]
    });
    metrics.stopTimer("cache busting");
};
