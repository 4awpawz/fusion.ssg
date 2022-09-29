/**
 * markdownToHTML - Converts markdown to HTML.
 */

import { marked } from "marked";

export const markdownToHTML = function(content: string): string {
    return marked.parse(content);
};
