export enum Resource {
  "file",
  "folder",
}

export interface Config {
  type: Resource;
  pathComponents: string[];
}

export enum CopyDirection {
  "fromRepoToLocalMachine",
  "fromLocalMachineToRepo",
}
