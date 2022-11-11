/**
 * Uses process.hrtime(time) for nano second precision.
 *
 * api: startTimer, stopTimer, getTimer, forEachTimer, deleteTimer, clearTimers
 */

const timers = new Map();

const startTimer = (name: string, precision = 3) => {
    const timer = {
        name,
        precision,
        started: process.hrtime(),
    };
    timers.set(name, timer);
};

const stopTimer = (name: string) => {
    const timer = timers.get(name);
    if (timer) {
        // divide by a million to get nano to mills
        const mills = process.hrtime(timer.started)[
            1
        ] / 1000000;
        // print message + time
        timer.elapsed =
            timer.name +
            ": " +
            process.hrtime(timer.started)[
            0
            ] +
            " s, " +
            mills.toFixed(timer.precision) +
            " ms";
        return timer.elapsed;
    }
};

const getTimer = (name: string) => timers.has(name) && timers.get(name);

const forEach = (callbackFn: () => void, thisArg: object) => timers.size > 0 && timers.forEach(callbackFn, thisArg);

const deleteTimer = (name: string) => timers.has(name) && timers.delete(name);

const clearTimers = () => timers.clear();

export {
    startTimer,
    stopTimer,
    getTimer,
    forEach,
    deleteTimer,
    clearTimers,
};
