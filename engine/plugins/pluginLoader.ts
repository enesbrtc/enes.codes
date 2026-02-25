import { Kernel } from "../kernel/kernel";
import { register as registerSystem } from "./systemPlugin";
import { register as registerFun } from "./funPlugin";
import { register as registerEasterEggs } from "./easterEggPlugin";

export function loadPlugins(kernel: Kernel) {
  console.log("Loading terminal plugins...");

  // Load all plugins with the kernel instance
  registerSystem(kernel);
  registerFun(kernel);
  registerEasterEggs(kernel);

  console.log("All plugins loaded successfully");
}

export function getPluginList(): string[] {
  return [
    "systemPlugin - Core system commands (help, deploy, ssh, clear)",
    "funPlugin - Essential commands (whoami, date, uptime)",
    "easterEggPlugin - Hidden discovery commands"
  ];
}