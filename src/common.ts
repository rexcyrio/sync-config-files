import os from "os";
import path from "path";

export const PLATFORM = os.platform();

export const IS_WINDOWS = PLATFORM === "win32";
export const IS_LINUX = PLATFORM === "linux";

/**
 * - On Windows: `Stefan Lee`
 * - On Linux: `stefanlee`
 */
export const USERNAME = os.userInfo().username;

/**
 * `C:\Users\Stefan Lee\Documents\Development\sync-config-files`
 */
const PROJECT_ROOT = path.join(
  // `C:\Users\Stefan Lee\Documents\Development\sync-config-files\src`
  import.meta.dirname,
  ".."
);

/**
 * `C:\Users\Stefan Lee\Documents\Development\sync-config-files\WINDOWS_ROOT`
 */
export const WINDOWS_ROOT = path.join(PROJECT_ROOT, "WINDOWS_ROOT");

/**
 * `C:\Users\Stefan Lee\Documents\Development\sync-config-files\LINUX_ROOT`
 */
export const LINUX_ROOT = path.join(PROJECT_ROOT, "LINUX_ROOT");
