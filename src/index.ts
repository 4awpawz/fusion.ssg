/**
 * site landing page.
 */

import { compile } from "./core/services/ts/compile.js";
import { compose } from "./core/services/composition/basic/compose.js";
import { hydrate } from "./core/services/composition/hydration/hydrate.js";
import { serialize } from "./core/services/serialization/serialize.js";
import * as metrics from "./core/lib/metrics.js";
import { discover } from "./core/services/discovery/discover.js";
import { collectionGerator } from "./core/services/composition/collections/collectionGenerator.js";
import type { BuildCategroy } from "./types/types.js";
import { tokenize } from "./core/services/tokenization/tokenize.js";
import { _writeMetaTimeStamp } from "./core/lib/io/_writeMetaTimeStamp.js";

export const run = async function(buildStrategy: BuildCategroy) {
    metrics.startTimer("total elapsed time");
    process.env["BUILD_STRATEGY"] = buildStrategy;
    console.log(`building ${buildStrategy.toLowerCase()}...`);
    const isOKToContine = await compile();
    isOKToContine && (await serialize(await tokenize(await hydrate(await collectionGerator(await compose(await discover()))))));
    await _writeMetaTimeStamp();
    metrics.stopTimer("total elapsed time");
    metrics.forEachTimer(timer => console.log(timer.elapsed));
};
