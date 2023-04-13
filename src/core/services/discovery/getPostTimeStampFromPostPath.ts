/**
 * getPostTimeStamp - Returns the date of a post, taken from its file path, and return, and return the date as a timestamp, i.e. in milliseconds.
 */

export const getPostTimeStampFromPostPath = function(path: string): number {
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const result = path.match(regex);
    if (result === null) return 0;
    return Date.parse(result[0]) as number;
};
