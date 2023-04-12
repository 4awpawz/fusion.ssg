/**
 * getCategoryPath - Converts a string of comma separated category names into a path.
 */

export const getCategoryPath = function(postCategories: string): string {
    return `/${postCategories.split(",").map(category => category.trim()).join("/")}`;
};
