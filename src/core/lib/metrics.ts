/**
 * Uses process.hrtime(time) for nano second precision.
 *
 * api: startTimer, stopTimer, getTimer, printLog, deleteTimer, clearTimers
 */


interface Timer {
    name: string,
    precision: number,
    started: [number, number],
    elapsed?: string
}

const timers = new Map();

const startTimer = (name: string, precision = 3) => {
    const timer: Timer = {
        name,
        precision,
        started: process.hrtime(),
    };
    timers.set(name, timer);
};

const noSuchTimer = (name: string) => {
    console.log(`no such timer named '${name}'`);
};

const stopTimer = (name: string): string | void => {
    const timer: Timer = timers.get(name);
    if (!timer) return noSuchTimer(name);
    // divide by a million to get nano to mills
    const mills = process.hrtime(timer.started)[1] / 1000000;
    // print message + time
    timer.elapsed =
        timer.name +
        ": " +
        process.hrtime(timer.started)[0] + " s, " +
        mills.toFixed(timer.precision) + " ms";
    return timer.elapsed;
};

const forEachTimer = (callbackFn: (timer: Timer) => void) => timers.size > 0 && timers.forEach(callbackFn);

const clearTimers = () => timers.clear();

export {
    startTimer,
    stopTimer,
    forEachTimer,
    clearTimers,
};
