import { discover } from "../services/discovery/discover.js";
import { compose } from "../services/composition/compose.js";
import { serialize } from "../services/serialize.js";
import { log } from "../lib/io/log.js";

const assets = await serialize(compose(await discover()));
log("assets", assets);
