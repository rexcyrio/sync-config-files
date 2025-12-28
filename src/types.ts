export enum Resource {
  "file",
  "folder",
  "listFolderContentsOnly",
}

export interface Config {
  type: Resource;
  pathComponents: string[];
}

export enum CopyDirection {
  "fromRepoToLocalMachine",
  "fromLocalMachineToRepo",
}
