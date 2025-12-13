import { program } from "commander";
import fs from "node:fs";
import path from "node:path";
import {
  IS_LINUX,
  IS_WINDOWS,
  LINUX_ROOT,
  PLATFORM,
  USERNAME,
  WINDOWS_ROOT,
} from "./common.js";
import { CopyDirection, Resource, type Config } from "./types.js";
import { setUsernameInPathStringIfAny } from "./utils/pathStringUsername.js";

const DEBUG = true;

const vscodeConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
      "AppData",
      "Roaming",
      "JetBrains",
      intelliJIdentifier,
      "options",
      "terminal-font.xml",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
      "AppData",
      "Roaming",
      "JetBrains",
      intelliJIdentifier,
      "options",
      "git.xml",
    ],
  },
];

const notepadPlusPlusConfig: Config[] = [
  {
    type: Resource.folder,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
      "AppData",
      "Roaming",
      "Notepad++",
      "plugins",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
      "AppData",
      "Roaming",
      "Notepad++",
      "config.xml",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
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
    pathComponents: ["C:", "Users", "__USERNAME__", "scoop.ps1"],
  },
  {
    type: Resource.file,
    pathComponents: ["C:", "Users", "__USERNAME__", ".gitconfig"],
  },
  {
    type: Resource.file,
    pathComponents: ["C:", "Users", "__USERNAME__", "vimfiles", "vimrc"],
  },
  {
    type: Resource.file,
    pathComponents: ["C:", "Users", "__USERNAME__", ".wslconfig"],
  },
];

const altSnapConfig: Config[] = [
  {
    type: Resource.file,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
      "Documents",
      "ShareX",
      "ApplicationConfig.json",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
      "Documents",
      "ShareX",
      "ApplicationConfig.json",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
      "Documents",
      "ShareX",
      "HotkeysConfig.json",
    ],
  },
  {
    type: Resource.file,
    pathComponents: [
      "C:",
      "Users",
      "__USERNAME__",
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
      "C:",
      "Users",
      "__USERNAME__",
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
    pathComponents: ["/home", "__USERNAME__", ".gitconfig"],
  },
  {
    type: Resource.file,
    pathComponents: ["/home", "__USERNAME__", ".vimrc"],
  },
  {
    type: Resource.file,
    pathComponents: ["/home", "__USERNAME__", "echo_path.sh"],
  },
  {
    type: Resource.file,
    pathComponents: ["/home", "__USERNAME__", "update.sh"],
  },
  {
    type: Resource.file,
    pathComponents: ["/home", "__USERNAME__", "windows.sh"],
  },
];

const etcWslConfigLinux: Config[] = [
  {
    type: Resource.file,
    pathComponents: ["/etc", "wsl.conf"],
  },
];

async function doCopy(copyDirection: CopyDirection) {
  let allConfigs: Config[];

  if (IS_WINDOWS) {
    allConfigs = [
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
  } else if (IS_LINUX) {
    allConfigs = [...homeConfigLinux, ...etcWslConfigLinux];
  } else {
    throw new Error(`Unknown platform '${PLATFORM}'`);
  }

  for (const config of allConfigs) {
    // `C:\Users\__USERNAME__\AppData\Roaming\...`
    const symbolicMachinePath = path.join(...config.pathComponents);

    // `C:\Users\Stefan Lee\AppData\Roaming\...`
    const concreteMachinePath = setUsernameInPathStringIfAny(
      symbolicMachinePath,
      USERNAME
    );

    let repoPath: string;

    if (IS_WINDOWS) {
      // `C:\Users\__USERNAME__\AppData\Roaming\...`
      repoPath = symbolicMachinePath;

      // `C\Users\__USERNAME__\AppData\Roaming\...`
      repoPath = repoPath.replace(":", "");

      // `C:\Users\Stefan Lee\Documents\Development\sync-config-files\WINDOWS_ROOT\C\Users\__USERNAME__\AppData\Roaming...`
      repoPath = path.join(WINDOWS_ROOT, repoPath);
    } else if (IS_LINUX) {
      // `/home/__USERNAME__`
      repoPath = symbolicMachinePath;

      // `/home/stefanlee/sync-config-files/home/__USERNAME__`
      repoPath = path.join(LINUX_ROOT, repoPath);
    } else {
      throw new Error(`Unknown platform '${PLATFORM}'`);
    }

    let source: string;
    let target: string;

    switch (copyDirection) {
      case CopyDirection.fromLocalMachineToRepo:
        source = concreteMachinePath;
        target = repoPath;
        break;

      case CopyDirection.fromRepoToLocalMachine:
        source = repoPath;
        target = concreteMachinePath;
        break;

      default:
        throw new Error(`Unknown copyDirection '${copyDirection}'`);
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
        throw new Error(`Unknown config.type '${config.type}'`);
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

  if (isToRepoFlagPresent) {
    doCopy(CopyDirection.fromLocalMachineToRepo);
  } else if (isFromRepoFlagPresent) {
    doCopy(CopyDirection.fromRepoToLocalMachine);
  } else {
    throw new Error();
  }
}

main();
