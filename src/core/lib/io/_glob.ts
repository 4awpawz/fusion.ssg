/**
 * _glob - async/await wrapper for glob.
 */

import glob from "glob";
import type { PromiseResultGlob } from "../../../types/types";

export const _glob = async function(path: string, options = {}): Promise<PromiseResultGlob> {
    return new Promise(resolve => {
        const _options = { ...options, ...{ ignore: ['node_moduless**/*'] } };
        glob(path, _options, (err, files) => {
            err ? resolve({ success: false, value: err }) : resolve({ success: true, value: files });
        });
    });
};
