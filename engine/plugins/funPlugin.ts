import { registerCommand, CommandContext } from "../kernel/terminalKernel";
import { Kernel } from "../kernel/kernel";

export function register(kernel: Kernel) {
  // Whoami command
  kernel.registerCommand("whoami", async (ctx: CommandContext) => {
    ctx.pushOutput(["enes.barutcu"]);
  }, { scope: "global" });

  // Date command
  kernel.registerCommand("date", async (ctx: CommandContext) => {
    const now = new Date();
    ctx.pushOutput([now.toISOString()]);
  }, { scope: "global" });

  // Uptime command
  kernel.registerCommand("uptime", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "uptime: 99 days, 23 hours, 59 minutes",
      "load average: 0.01, 0.02, 0.03"
    ]);
  }, { scope: "global" });
}