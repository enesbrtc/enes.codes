export type TerminalContext =
  | "local"
  | "engineer"
  | "ssh";

export interface ShellState {
  context: TerminalContext;
}

let currentContext: TerminalContext = "local";

export function getContext(): TerminalContext {
  return currentContext;
}

export function setContext(context: TerminalContext) {
  currentContext = context;
}

export function resetContext() {
  currentContext = "local";
}