/**
 * _glob - async/await wrapper for glob.
 */

import glob from "glob";
import type { PromiseResultGlob } from "../../../types/types";

export const _glob = async function _glob(path: string): Promise<PromiseResultGlob> {
    return new Promise(resolve => {
        glob(path, { ignore: ['node_moduless**/*'] }, (err, files) => {
            err ? resolve({ success: false, value: err }) : resolve({ success: true, value: files });
        });
    });
};
