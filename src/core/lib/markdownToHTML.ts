/**
 * markdownToHTML - converts markdown to HTML.
 */

import { marked } from "marked";

export const markdownToHTML = async function(content: string): Promise<string> {
    return marked.parse(content);
};
