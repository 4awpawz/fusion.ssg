/**
 * _glob - async/await wrapper for glob.
 */

import glob from "glob";

export const _glob = async function _glob(path: string): Promise<PromiseResultGlob> {
    return new Promise(resolve => {
        glob(path, { ignore: ['node_moduless**/*'] }, (err, files) => {
            err ? resolve({ success: false, value: err }) : resolve({ success: true, value: files });
        });
    });
};
