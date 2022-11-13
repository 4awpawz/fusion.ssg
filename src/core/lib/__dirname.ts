/**
 * __dirname - Typescript doesn't support Node module global __filename and __dirname. This module
 * implements and exports them so that they can be used as if they were native Node implementations.
 */

import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
