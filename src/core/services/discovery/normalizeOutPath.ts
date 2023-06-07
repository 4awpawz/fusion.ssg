/**
 * normalizeOutPath - Removes 'src/' and immediate child folder containing asset.
 */

export const normalizeOutPath = function(path: string): string {
    return path.split("/").slice(2).join("/");
};
