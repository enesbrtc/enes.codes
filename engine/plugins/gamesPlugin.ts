import { registerCommand, CommandContext } from "../kernel/terminalKernel";
import { startSnakeGame, stopSnakeGame } from "../games/snake";

export function register(kernel: { registerCommand: typeof registerCommand; listCommands: () => { name: string; hidden: boolean }[] }) {
  // Snake game command
  registerCommand("snake", async (ctx: CommandContext) => {
    const initialRender = startSnakeGame(ctx);
    ctx.pushOutput(initialRender);
  });
}