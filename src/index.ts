/**
 * index - Builds user's site.
 */

import { copyToLib } from "./core/services/copy/copyToLib.js";
import { getAssets } from "./core/services/discovery/getAssets.js";
import { compose } from "./core/services/composition/basic/compose.js";
import { hydrate } from "./core/services/composition/hydration/hydrate.js";
import { serialize } from "./core/services/serialize.js";
import * as metrics from "./core/lib/metrics.js";

export const run = async function() {
    metrics.clearTimers();
    metrics.startTimer("process");
    // Copy recognized content to the lib/ folder.
    await copyToLib();
    // Build!
    const assets = (await serialize(await hydrate(await compose(await getAssets()))));
    console.log("assets", assets);
    console.log(metrics.stopTimer("process"));
};
