/**
 * getPostName - returns the name of the post.
 */

import { parse } from "path";

export const getPostName = function(path: string): string {
    // Remove everything upto and including the post date to get the name.
    const articleName = parse(path.substring(31)).name;
    return articleName;
};
