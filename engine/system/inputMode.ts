export type InputMode =
  | "local"
  | "ssh-auth"
  | "ssh-shell";

let currentMode: InputMode = "local";

export function setInputMode(mode: InputMode): void {
  currentMode = mode;
}

export function getInputMode(): InputMode {
  return currentMode;
}