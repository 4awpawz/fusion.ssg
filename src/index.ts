#!/usr/bin/env node

import { copyToLib, copyToBuild } from "./core/services/copy/copy.js";
import { getAssets } from "./core/services/discovery/getAssets.js";
import { compose } from "./core/services/composition/basic/compose.js";
import { hydrate } from "./core/services/composition/hydration/hydrate.js";
import { serialize } from "./core/services/serialize.js";

// TODO: 22/11/08 20:30:14 - jeffreyschwartz : Move src/data/ to lob/data/ prior to composition.
// Copy recognized content to the lib/ folder.
copyToLib();
// Build!
const assets = await serialize(await hydrate(await compose(await getAssets())));
// Copy recognized content to the build/ folder.
copyToBuild();
console.log("assets", assets);
