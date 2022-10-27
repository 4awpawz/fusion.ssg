/**
 * delimitTokenContent - wraps token content in curly braces.
 */

import type { Token } from "../../../types/types";

export const delimitTokenContent = function(tokenContent: Token | string): Token {
    let _tokenContent = tokenContent;
    _tokenContent = _tokenContent.startsWith("{") ? _tokenContent : `{${_tokenContent}`;
    _tokenContent = _tokenContent.endsWith("}") ? _tokenContent : `${_tokenContent}}`;
    return _tokenContent as Token;
};
