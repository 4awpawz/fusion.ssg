
/**
 * getComponentProfilesFromTokens - returns ComponentProfile[].
 */

import type { ComponentProfile, Token } from "../../types/types";
import { getMatchingTokens } from "./getMatchingTokens.js";

export const getComponentProfilesFromTokens = function(assetContent: string, tokenValidatorFnId: string): ComponentProfile[] {
    const matches = getMatchingTokens(assetContent, tokenValidatorFnId);
    if (matches.length === 0) return [];
    const componentProfiles: ComponentProfile[] = [];
    for (const match of matches) {
        if (typeof match[2] === "undefined") continue;
        // Get the component path and its data sources declared in the token.
        const tokenParts = match[2].split(",");
        const tokenPath = tokenParts[0]; // string - component p
        const tokenDataSources = tokenParts.slice(1).map(item => item.trim()); // string[] - data source(s)
        componentProfiles.push({ token: match[2] as Token, path: tokenPath as string, dataSources: tokenDataSources });
    }
    return componentProfiles;
};
