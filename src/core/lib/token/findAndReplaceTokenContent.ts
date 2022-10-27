/**
 * findAndReplaceTokenContent - find a tiken and  replace its content.
 */

import { delimitTokenContent } from "./delimitTokenContent.js";
import type { Token } from "../../../types/types";

export const findAndReplaceTokenContent = function(content: string, token: Token | string, value: string): string {
    const _token = delimitTokenContent(token);
    return content.replace(new RegExp(_token, "g"), `${value}`);
};
