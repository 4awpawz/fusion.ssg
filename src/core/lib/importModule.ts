/**
 * importModule - dynamically import a module.
 */

import chalk from "chalk";
import { join } from "path";
import type { CollectionComponent, Component, Configuration } from "../../types/types";

export const importModule = async function(modulePath: string, moduleName: string, config: Configuration): Promise<Component | CollectionComponent> {
    // Dynamic import returns promise.
    let component;
    try {
        const _modulePath = join(process.cwd(), config.libFolder, modulePath);
        component = await import(_modulePath).then(module => module[moduleName]);
    } catch (error) {
        console.error(chalk.red(`there was an error when dynamically IMPORTing component module ${modulePath}`));
        throw error;
    }
    return component;
};
