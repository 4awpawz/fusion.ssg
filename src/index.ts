#!/usr/bin/env node

import { getAssets } from "./core/services/discovery/getAssets.js";
import { compose } from "./core/services/composition/basic/compose.js";
import { hydrate } from "./core/services/composition/hydration/hydrate.js";
import { serialize } from "./core/services/serialize.js";

const assets = await serialize(await hydrate(await compose(await getAssets())));
console.log("assets", assets);
