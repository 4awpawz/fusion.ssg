import path from "path";
import * as chokidar from "chokidar";
import { run } from "../../index.js";

// One-liner for 'src' directory
export const watcher = function() {
    const watchPath = path.join(process.cwd(), "src/**");
    chokidar.watch(watchPath, { ignoreInitial: true }).on("all", async (event, path) => {
        console.log(event, path);
        await run();
    });
};
