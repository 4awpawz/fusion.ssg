/**
 * metaTimeStamp - Writes an empty file to meta/ which is used to determine if components are stale and need to be compiled.
 */

import { join } from "path";
import { config } from "../../services/configuration/configuration.js";
import { metaTimeStampFileName } from "../../services/configuration/metaTimeStampFileName.js";
import { _writeContentToFile } from "./../io/_writeContentToFile.js";

export const _writeMetaTimeStamp = async function(): Promise<void> {
    const metaFolderName = config.metaFolder;
    const path = join(process.cwd(), metaFolderName, metaTimeStampFileName);
    await _writeContentToFile(path, "meta_timestamp");
};
