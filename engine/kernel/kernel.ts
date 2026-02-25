import { runCommand as _runCommand, listCommands as _listCommands, registerCommand as _registerCommand, resetKernel as _resetKernel, getActiveInteractiveMode as _getActiveInteractiveMode } from "./terminalKernel";
import { loadPlugins } from "../plugins/pluginLoader";

let kernelInstance: Kernel | null = null;

export interface Kernel {
  runCommand: typeof _runCommand;
  listCommands: typeof _listCommands;
  registerCommand: typeof _registerCommand;
  resetKernel: typeof _resetKernel;
  getActiveInteractiveMode: typeof _getActiveInteractiveMode;
}

function createKernel(): Kernel {
  return {
    runCommand: _runCommand,
    listCommands: _listCommands,
    registerCommand: _registerCommand,
    resetKernel: _resetKernel,
    getActiveInteractiveMode: _getActiveInteractiveMode,
  };
}

export function getKernel(): Kernel {
  if (!kernelInstance) {
    kernelInstance = createKernel();
    loadPlugins(kernelInstance);

    // Debug: Verify commands are registered
    console.log(
      "Registered commands:",
      kernelInstance.listCommands().map(cmd => cmd.name).sort()
    );
  }
  return kernelInstance;
}