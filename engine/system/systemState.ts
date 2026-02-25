export type MachineState =
  | "idle"
  | "engineer"
  | "ssh-connected";

export interface SystemState {
  state: MachineState;
}

let currentMachineState: MachineState = "idle";
let stateListeners: ((state: MachineState) => void)[] = [];

export function setMachineState(state: MachineState) {
  if (currentMachineState !== state) {
    currentMachineState = state;
    stateListeners.forEach(listener => listener(state));
  }
}

export function getMachineState(): MachineState {
  return currentMachineState;
}

export function subscribeToMachineState(listener: (state: MachineState) => void): () => void {
  stateListeners.push(listener);
  return () => {
    stateListeners = stateListeners.filter(l => l !== listener);
  };
}