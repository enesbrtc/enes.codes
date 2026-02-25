export type ShellType =
  | "local"
  | "ssh-auth"
  | "ssh";

let activeShell: ShellType = "local";

export function setShell(type: ShellType): void {
  activeShell = type;
}

export function getShell(): ShellType {
  return activeShell;
}