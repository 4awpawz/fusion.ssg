#!/usr/bin/env node

import { getAssets } from "./core/services/discovery/getAssets.js";
import { compose } from "./core/services/composition/compose.js";
import { serialize } from "./core/services/serialize.js";

const assets = await serialize(await compose(await getAssets()));
console.log("assets", assets);
