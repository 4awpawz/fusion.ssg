/**
 * Main entry point. Called from both CLI and directly.
 */

import chalk from "chalk";
import { compileBrowserScripts, compileComponents } from "./core/services/ts/compile.js";
import { compose } from "./core/services/composition/basic/compose.js";
import { hydrate } from "./core/services/composition/hydration/hydrate.js";
import { serialize } from "./core/services/serialization/serialize.js";
import * as metrics from "./core/lib/metrics.js";
import { discover } from "./core/services/discovery/discover.js";
import { collectionGerator } from "./core/services/composition/collections/collectionGenerator.js";
import type { BuildStrategyOptions, Timer } from "./types/types.js";
import { tokenize } from "./core/services/tokenization/tokenize.js";
import { _writeMetaTimeStamp } from "./core/lib/io/_writeMetaTimeStamp.js";
import { config } from "./core/services/configuration/configuration.js";
import { cleanBuildFolder } from "./core/lib/cleanBuildFolder.js";
import { cacheBust } from "./core/services/cacheBusting/cacheBust.js";

export const run = async function(buildStrategyOptions: BuildStrategyOptions) {
    metrics.startTimer("total elapsed time");
    await cleanBuildFolder(config);
    process.env["BUILD_STRATEGY"] = buildStrategyOptions.buildStrategy;
    console.log("build strategy:", buildStrategyOptions.buildStrategy);
    const isOKToContinue = await compileComponents() && await compileBrowserScripts();
    if (isOKToContinue) {
        (await serialize(tokenize(await hydrate(await collectionGerator(await compose(await discover()))))));
        buildStrategyOptions.cacheBust && await cacheBust();
        await _writeMetaTimeStamp();
    }
    metrics.stopTimer("total elapsed time");
    const reporter = (timer: Timer) => console.log(`${timer.name}: ${chalk.green(timer.elapsed)}`);
    buildStrategyOptions.verbose ?
        metrics.forEachTimer(reporter) :
        metrics.filterTimer("total elapsed time", reporter);
};
