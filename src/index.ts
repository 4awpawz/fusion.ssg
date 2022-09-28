#!/usr/bin/env node

import { discover } from "./core/services/discovery/discover.js";
import { compose } from "./core/services/composition/compose.js";
import { serialize } from "./core/services/serialize.js";

const assets = await serialize(compose(await discover()));
console.log("assets", assets);
