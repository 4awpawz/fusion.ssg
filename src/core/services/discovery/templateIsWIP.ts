/**
 * templateIsWIP - return true if wip matches folder or file patch and isn't ignored, false otherwise.
 */

export const templateIsWIP = function(wips: string[], templatePath: string) {
    for (const wip of wips) {
        const isIgnore = wip[0] === "!";
        const _wip = isIgnore ? wip.substring(1) : wip;
        const wipIsAFolder = _wip.length > 0 && _wip.endsWith("/");
        if (wipIsAFolder && templatePath.startsWith(_wip)) {
            return isIgnore ? false : true;
        }
        if (_wip === templatePath) {
            return isIgnore ? false : true;
        }
    }
    return false;
};
