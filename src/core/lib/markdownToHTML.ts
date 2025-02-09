/**
 * markdownToHTML - converts markdown to HTML.
 */

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

export const markdownToHTML = async function(content: string) {
    marked.use(gfmHeadingId({}));
    return marked.parse(content);
};
