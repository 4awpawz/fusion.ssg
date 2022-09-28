import fs from "fs-extra";

export const _emptyDir = async function(path: string): Promise<void> {
    try {
        await fs.emptyDir(path);
    } catch (error) {
        console.error("there was an error:", error);
    }
};
