import { program } from "commander";
import fs from "node:fs";
import os from "node:os";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CopyDirection, Resource, type Config } from "./types.js";

const DEBUG = true;

/**
 * `C:\Users\Stefan Lee\Documents\Development\sync-config-files`
 */
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * `C:\Users\Stefan Lee\Documents\Development\sync-config-files\USERPROFILE`
 */
const REPO_USERPROFILE = path.join(__dirname, "USERPROFILE");

/**
 * `C:\Users\Stefan Lee\Documents\Development\sync-config-files\HOME`
 */
const REPO_HOME = path.join(__dirname, "HOME");

/**
 * `C:\Users\Stefan Lee`
 *
 * or
 *
 * `/home/stefanlee`
 */
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

// might need to change this as needed
const intelliJIdentifier = "IdeaIC2025.2";

const intelliJConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "JetBrains",
      intelliJIdentifier,
      "codestyles",
      "Default.xml",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "JetBrains",
      intelliJIdentifier,
      "keymaps",
      "VSCode copy.xml",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "JetBrains",
      intelliJIdentifier,
      "options",
      "editor-font.xml",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "JetBrains",
      intelliJIdentifier,
      "options",
      "editor.xml",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "JetBrains",
      intelliJIdentifier,
      "options",
      "ide.general.xml",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "JetBrains",
      intelliJIdentifier,
      "options",
      "terminal-font.xml",
    ],
  },
];

const notepadPlusPlusConfig: Config[] = [
  {
    type: Resource.folder,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "Notepad++",
      "plugins",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "Notepad++",
      "config.xml",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "Notepad++",
      "shortcuts.xml",
    ],
  },
];

const homeConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "scoop.ps1",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      ".gitconfig",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "vimfiles",
      "vimrc",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      ".wslconfig",
    ],
  },
];

const altSnapConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "scoop",
      "persist",
      "altsnap",
      "AltSnap.ini",
    ],
  },
];

const powerShellProfileConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "Documents",
      "WindowsPowerShell",
      "Microsoft.PowerShell_profile.ps1",
    ],
  },
];

const everythingConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Roaming",
      "Everything",
      "Everything.ini",
    ],
  },
];

const shareXConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "Documents",
      "ShareX",
      "ApplicationConfig.json",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "Documents",
      "ShareX",
      "ApplicationConfig.json",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "Documents",
      "ShareX",
      "HotkeysConfig.json",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "Documents",
      "ShareX",
      "UploadersConfig.json",
    ],
  },
];

const windowsTerminalConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <USERPROFILE>
      "AppData",
      "Local",
      "Packages",
      "Microsoft.WindowsTerminal_8wekyb3d8bbwe",
      "LocalState",
      "settings.json",
    ],
  },
];

const homeConfigLinux: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      // <HOME>
      ".gitconfig",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <HOME>
      ".vimrc",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <HOME>
      "echo_path.sh",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <HOME>
      "update.sh",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      // <HOME>
      "windows.sh",
    ],
  },
];

async function doCopyWindows(copyDirection: CopyDirection) {
  const allConfigs = [
    ...vscodeConfig,
    ...intelliJConfig,
    ...notepadPlusPlusConfig,
    ...homeConfig,
    ...altSnapConfig,
    ...powerShellProfileConfig,
    ...everythingConfig,
    ...shareXConfig,
    ...windowsTerminalConfig,
  ];

  for (const config of allConfigs) {
    let source: string;
    let target: string;

    switch (copyDirection) {
      case CopyDirection.fromLocalMachineToRepo:
        source = path.join(USERPROFILE, ...config.pathComponents);
        target = path.join(REPO_USERPROFILE, ...config.pathComponents);
        break;

      case CopyDirection.fromRepoToLocalMachine:
        source = path.join(REPO_USERPROFILE, ...config.pathComponents);
        target = path.join(USERPROFILE, ...config.pathComponents);
        break;

      default:
        throw new Error();
    }

    // mkdir -p
    await fs.promises.mkdir(path.dirname(target), { recursive: true });

    debugLog(
      `
Copying
  From : '${source}'
  To   : '${target}'
`.trim()
    );

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

async function doCopyLinux(copyDirection: CopyDirection) {
  const allConfigs = [...homeConfigLinux];

  for (const config of allConfigs) {
    let source: string;
    let target: string;

    switch (copyDirection) {
      case CopyDirection.fromLocalMachineToRepo:
        source = path.join(USERPROFILE, ...config.pathComponents);
        target = path.join(REPO_HOME, ...config.pathComponents);
        break;

      case CopyDirection.fromRepoToLocalMachine:
        source = path.join(REPO_HOME, ...config.pathComponents);
        target = path.join(USERPROFILE, ...config.pathComponents);
        break;

      default:
        throw new Error();
    }

    // mkdir -p
    await fs.promises.mkdir(path.dirname(target), { recursive: true });

    debugLog(
      `
Copying
  From : '${source}'
  To   : '${target}'
`.trim()
    );

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
function debugLog(...message: any[]) {
  if (DEBUG) {
    console.log(...message);
  }
}

function main() {
  const toRepo = {
    cliFlag: "--to-repo",
    name: "toRepo",
  };
  const fromRepo = {
    cliFlag: "--from-repo",
    name: "fromRepo",
  };

  program.option(toRepo.cliFlag).option(fromRepo.cliFlag).parse();

  const options = program.opts();
  const isToRepoFlagPresent = Object.hasOwn(options, toRepo.name);
  const isFromRepoFlagPresent = Object.hasOwn(options, fromRepo.name);

  if (!isToRepoFlagPresent && !isFromRepoFlagPresent) {
    console.error(
      `Please specify at least one of the following: '${toRepo.cliFlag}', '${fromRepo.cliFlag}'`
    );

    return;
  }

  if (isToRepoFlagPresent && isFromRepoFlagPresent) {
    console.error(
      `Please specify only one of the following: '${toRepo.cliFlag}', '${fromRepo.cliFlag}'`
    );

    return;
  }

  const platform = os.platform();

  switch (platform) {
    case "win32":
      if (isToRepoFlagPresent) {
        doCopyWindows(CopyDirection.fromLocalMachineToRepo);
      } else {
        doCopyWindows(CopyDirection.fromRepoToLocalMachine);
      }
      break;

    case "linux":
      if (isToRepoFlagPresent) {
        doCopyLinux(CopyDirection.fromLocalMachineToRepo);
      } else {
        doCopyLinux(CopyDirection.fromRepoToLocalMachine);
      }
      break;

    default:
      throw new Error(`Unknown platform '${platform}'`);
  }
}

main();
