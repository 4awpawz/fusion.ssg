/**
 * getMatchingTokens - returns an array of tokens.
 */

import type { TokenValidator, TokenValidators } from "../../types/types";
import { _filter } from "./functional.js";

export const tokenValidators: TokenValidators = {
    // TODO: add template token validator here.
    oneBrace: (match: RegExpMatchArray): boolean => match[1] === "{" && match[3] === "}",
    twoBraces: (match: RegExpMatchArray): boolean => match[1] === "{{" && match[3] === "}}",
    threeBraces: (match: RegExpMatchArray): boolean => match[1] === "{{{" && match[3] === "}}}",
    fourBraces: (match: RegExpMatchArray): boolean => match[1] === "{{{{" && match[3] === "}}}}",
};

export const getMatchingTokens = function(assetContent: string, tokenValidatorFnId: string): RegExpMatchArray[] {
    // TODO: add caching based on asset path here to eliminate calling the following regex multiple times for the same template.
    const regex = /(\{{1,})(.*?)(\}{1,})/g;
    const matches = assetContent.matchAll(regex);
    const _matches = _filter([...matches], tokenValidators[tokenValidatorFnId] as TokenValidator);
    return _matches;
};
