/**
 * getPostTimeStamp - Returns the date of a post, taken from its file path, as a timestamp, i.e. in milliseconds.
 */

export const getPostTimeStampFromPostPath = function(path: string): number {
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const result = path.match(regex);
    if (result === null) return 0;
    const date = result[0].replaceAll("-", "/"); // Without this the date will be off by 1 day.
    return Date.parse(date) as number;
};
