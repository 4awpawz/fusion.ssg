/**
 * includeIsConditional - return true if include is conditional, false otherwise.
 */

import { config } from "../configuration/configuration.js";

export const includeIsConditional = function(includePath: string) {
    const conditionalIncludes = config.userConfig.conditionalIncludes;
    const iPath = includePath.split("/").slice(2).join("/"); // Remove src/includes from includePath.
    if (typeof conditionalIncludes.developmentOnly !== "undefined" && process.env["BUILD_STRATEGY"] === "RELEASE" && conditionalIncludes.developmentOnly.includes(iPath)) return true;
    if (typeof conditionalIncludes.releaseOnly !== "undefined" && process.env["BUILD_STRATEGY"] === "DEVELOPMENT" && conditionalIncludes.releaseOnly.includes(iPath)) return true;
    return false;
};
