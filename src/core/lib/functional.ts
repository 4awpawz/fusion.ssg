/**
 * Functional Style Generic Filter Function.
 */

// _filter(T[], ()) => T[]
export function _filter<T>(array: T[], cb: (item: T) => boolean): T[] {
    return array.filter(cb);
}

// _forEach(T[], ()) => void
export function _forEach<T>(array: T[], cb: (item: T, index: number, array: T[]) => void) {
    array.forEach(cb);
}

// _find(T[], ()) => T | undefined
export function _find<T>(array: T[], cb: (item: T, index: number, array: T[]) => boolean) : T | undefined {
    return array.find(cb);
}
