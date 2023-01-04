/**
 * markdownToHTML - Converts markdown to HTML.
 */

import { marked } from "marked";

interface Token {
    type: string,
    raw: string
}

const templateMarker = {
    name: 'templateMarker',
    level: 'block',
    start(src: string) { return src.indexOf("{{{"); },
    // tokenizer(src: string, tokens: unknown[]): unknown {
    tokenizer(src: string): Token | void {
        const rule = /^{{{([^}]+)}}}/;
        const match = rule.exec(src);
        if (match) {
            return {
                type: 'templateMarker',
                raw: match[0]
            };
        }
        return;
    },
    renderer(token: Token) {
        return token.raw;
    }
};

marked.use({ extensions: [templateMarker as marked.TokenizerExtension] });

export const markdownToHTML = function(content: string): string {
    return marked.parse(content);
};
