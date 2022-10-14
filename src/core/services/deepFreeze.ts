export const deepFreeze = function(object: any): any {
    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object);
    // Freeze properties before freezing self
    for (const name of propNames) {
        const value = object[name];
        if (value && typeof value === "object") deepFreeze(value);
    }
    return Object.freeze(object);
};
