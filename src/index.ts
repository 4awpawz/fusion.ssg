/**
 * index - Builds user's site.
 */

import { copyDataFilesToLib } from "./core/services/copy/copyDataFilesToLib.js";
import { getAssets } from "./core/services/discovery/getAssets.js";
import { compose } from "./core/services/composition/basic/compose.js";
import { hydrate } from "./core/services/composition/hydration/hydrate.js";
import { serialize } from "./core/services/serialize.js";
import * as metrics from "./core/lib/metrics.js";

export const run = async function() {
    metrics.clearTimers();
    metrics.startTimer("total elapsed time");
    await copyDataFilesToLib();
    (await serialize(await hydrate(await compose(await getAssets()))));
    metrics.stopTimer("total elapsed time");
    metrics.forEachTimer(timer => console.log(timer.elapsed));
};
