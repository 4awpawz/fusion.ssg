/**
 * normalizeOutPath - Removes 'src/' and parent folder containing asset
 */

export const normalizeOutPath = function(path: string): string {
    return path.split("/").slice(2).join("/");
};
