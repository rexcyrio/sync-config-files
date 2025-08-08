import fs from "node:fs";
import os from "node:os";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resource, type Config } from "./types.js";

const DEBUG = true;

// C:\Users\Stefan Lee\Documents\Development\sync-config-files
const __dirname = dirname(fileURLToPath(import.meta.url));

// C:\Users\Stefan Lee
const USERPROFILE = os.homedir();

const vscodeConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "Code",
      "User",
      "settings.json",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "Code",
      "User",
      "keybindings.json",
    ],
  },
  {
    type: Resource.folder,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "Code",
      "User",
      "snippets",
    ],
  },
];



async function copyFromLocalMachineToRepo() {
  for (const config of vscodeConfig) {
    const source = path.join(USERPROFILE, ...config.pathComponents);
    const target = path.join(__dirname, ...config.pathComponents);
    debugLog(`Copying from '${source}' to '${target}'`);

    switch (config.type) {
      case Resource.file:
        // overwrite target
        await fs.promises.copyFile(source, target);
        break;

      case Resource.folder:
        // copy entire folder
        await fs.promises.cp(source, target, { recursive: true });
        break;

      default:
        throw new Error(`Unknown type '${config.type}'`);
    }
  }
}

// console.log() uses any[]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debugLog(...s: any[]) {
  if (DEBUG) {
    console.log(...s);
  }
}

function main() {
  copyFromLocalMachineToRepo();
}

main();
