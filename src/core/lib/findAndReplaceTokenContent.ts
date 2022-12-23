/**
 * findAndReplaceTokenContent - find a token and  replace its content.
 */

import type { Token } from "../../types/types";

export const findAndReplaceTokenContent = function(content: string, token: Token | string, value: string): string {
    return content.replace(new RegExp(token, "g"), `${value}`);
};
