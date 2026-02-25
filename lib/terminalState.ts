// Global terminal state management
let terminalCloseCallback: (() => void) | null = null;
let terminalOpenState = false;
let terminalStateListeners: ((isOpen: boolean) => void)[] = [];

export function setTerminalCloseCallback(callback: () => void) {
  terminalCloseCallback = callback;
}

export function closeTerminal() {
  if (terminalCloseCallback) {
    terminalCloseCallback();
  }
}

export function setTerminalOpen(isOpen: boolean) {
  terminalOpenState = isOpen;
  terminalStateListeners.forEach(listener => listener(isOpen));
}

export function getTerminalOpen(): boolean {
  return terminalOpenState;
}

export function subscribeToTerminalState(listener: (isOpen: boolean) => void): () => void {
  terminalStateListeners.push(listener);
  // Return unsubscribe function
  return () => {
    const index = terminalStateListeners.indexOf(listener);
    if (index > -1) {
      terminalStateListeners.splice(index, 1);
    }
  };
}