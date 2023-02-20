/**
 * markdownToHTML - converts markdown to HTML.
 */

import { marked } from "marked";

interface Token {
    type: string,
    raw: string
}

// TODO: 23/03/03 20:46:44 - jeffreyschwartz : Add for 1 and 2 braces.
const templateMarker1 = {
    name: 'templateMarker',
    level: 'block',
    start(src: string) { return src.indexOf("{{{"); },
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

const templateMarker2 = {
    name: 'templateMarker',
    level: 'block',
    start(src: string) { return src.indexOf("{{{{"); },
    tokenizer(src: string): Token | void {
        const rule = /^{{{{([^}]+)}}}}/;
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
marked.use({ extensions: [templateMarker1 as marked.TokenizerExtension, templateMarker2 as marked.TokenizerExtension] });

export const markdownToHTML = function(content: string): string {
    return marked.parse(content);
};
