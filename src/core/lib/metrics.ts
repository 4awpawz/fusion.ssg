/**
 * Metrics uses process.hrtime(time) for nano second precision.
 * public api: startTimer, stopTimer, forEachTimer, clearTimers, filterTimer
 */

import chalk from "chalk";
import type { Timer } from "../../types/types.js";

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
    console.log(chalk.red(`no such timer named '${name}'`));
};

const stopTimer = (name: string): string | void => {
    const timer: Timer = timers.get(name);
    if (!timer) return noSuchTimer(name);
    const mills = process.hrtime(timer.started)[1] / 1000000;
    timer.elapsed = process.hrtime(timer.started)[0] + " s, " + mills.toFixed(timer.precision) + " ms";
    return timer.elapsed;
};

const forEachTimer = (callbackFn: (timer: Timer) => void) => timers.size > 0 && timers.forEach(callbackFn);

const filterTimer = (name: string, callbackFn: (timer: Timer) => void) => timers.size > 0 && timers.has(name) && callbackFn(timers.get(name));

const clearTimers = () => timers.clear();

export {
    startTimer,
    stopTimer,
    forEachTimer,
    filterTimer,
    clearTimers,
};
