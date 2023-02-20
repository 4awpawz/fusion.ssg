/**
 * index - Builds user's site.
 */

import { compile } from "./core/services/ts/compile.js";
import { compose } from "./core/services/composition/basic/compose.js";
import { hydrate } from "./core/services/composition/hydration/hydrate.js";
import { serialize } from "./core/services/serialize.js";
import * as metrics from "./core/lib/metrics.js";
import { discover } from "./core/services/discovery/discover.js";
import { collectionGerator } from "./core/services/composition/collections/collectionGenerator.js";

export const run = async function() {
    metrics.startTimer("total elapsed time");
    const isOKToContine = await compile();
    isOKToContine && (await serialize(await hydrate(await collectionGerator(await compose(await discover())))));
    metrics.stopTimer("total elapsed time");
    metrics.forEachTimer(timer => console.log(timer.elapsed));
};
