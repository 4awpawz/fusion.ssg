/**
 * isDateValid - Date validator.
 */

const isYearValid = function(y: unknown): boolean {
    return typeof (y) === "number";
};

const isMonthValid = function(m: unknown): boolean {
    if (typeof (m) !== "number") {
        return false;
    }
    return m >= 1 && m <= 12;
};

const isLeapYear = function(y: number): boolean {
    // If year is not evenly divisible by 4 it isn"t a leap year
    if (y % 4) {
        return false;
    }
    // If year is evenly divisible by 4 and is not
    // evenly divisible by 100 it is a leap year
    if (y % 100) {
        return true;
    }
    // If a year is evenly divisible by 4 and it is evenly divisible
    // by 100 and it is evenly divisible by 400 it is a leap year
    return (y % 400 === 0);
};

const isDayValid = function(y: number, m: number, d: unknown): boolean {
    if (typeof d !== "number") return false;
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Validate numerics and min day range
    if (typeof (d) !== "number" || d < 1) return false;
    // Validate for leap year (2/29)
    if (typeof m === "undefined" || m < 0 || m > 12) return false;
    if (m === 2 && d === 29) return isLeapYear(y);
    // Validate for all other dates
    const index = m - 1;
    const dim = daysInMonths[index] as number;
    if (d <= dim) return true;
    return false;
};

export const isPostDateValid = function(m: unknown, d: unknown, y: unknown): boolean {
    return (isYearValid(y) && isMonthValid(m) && isDayValid(y as number, m as number, d));
};
