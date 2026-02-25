import { terminalBuffer } from "../kernel/terminalBuffer";
import { getSession, setSession } from "../session/sessionManager";
import { sshFilesystem } from "../ssh/sshFilesystem";
import { setShell } from "../shell/shellController";
import { setContext } from "../shell/shellContext";

export type SSHCommandContext = {
  args: string[];
  raw: string;
  session: { username: string; host: string; cwd: string };
  pushOutput: (content: string | string[]) => void;
};

export type SSHCommandHandler = (ctx: SSHCommandContext) => Promise<void>;

class SSHKernel {
  private commands = new Map<string, SSHCommandHandler>();

  registerCommand(name: string, handler: SSHCommandHandler): void {
    this.commands.set(name, handler);
  }

  async runCommand(input: string): Promise<void> {
    const session = getSession();
    if (session.type !== "ssh" || session.state !== "shell") {
      terminalBuffer.push("SSH session not active");
      return;
    }

    const trimmed = input.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const handler = this.commands.get(command);
    if (!handler) {
      terminalBuffer.push(`${command}: command not found`);
      return;
    }

    try {
      const context: SSHCommandContext = {
        args,
        raw: trimmed,
        session: {
          username: session.username,
          host: session.host,
          cwd: session.cwd
        },
        pushOutput: (content: string | string[]) => {
          if (Array.isArray(content)) {
            terminalBuffer.pushMultiple(content);
          } else {
            terminalBuffer.push(content);
          }
        }
      };

      await handler(context);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      terminalBuffer.push(`Error executing ${command}: ${errorMessage}`);
    }
  }
}

const sshKernel = new SSHKernel();

// Register SSH commands
sshKernel.registerCommand("ls", async (ctx) => {
  const path = ctx.args[0] || ctx.session.cwd;
  const contents = sshFilesystem.listDirectory(path);
  ctx.pushOutput(contents);
});

sshKernel.registerCommand("cd", async (ctx) => {
  const path = ctx.args[0];
  if (!path) {
    ctx.pushOutput("cd: missing operand");
    return;
  }

  const newPath = sshFilesystem.changeDirectory(ctx.session.cwd, path);
  if (newPath) {
    ctx.session.cwd = newPath;
  } else {
    ctx.pushOutput(`cd: ${path}: No such file or directory`);
  }
});

sshKernel.registerCommand("pwd", async (ctx) => {
  ctx.pushOutput(ctx.session.cwd);
});

sshKernel.registerCommand("cat", async (ctx) => {
  const filename = ctx.args[0];
  if (!filename) {
    ctx.pushOutput("cat: missing operand");
    return;
  }

  const content = sshFilesystem.readFile(ctx.session.cwd, filename);
  if (content !== null) {
    ctx.pushOutput(content);
  } else {
    ctx.pushOutput(`cat: ${filename}: No such file or directory`);
  }
});

sshKernel.registerCommand("exit", async (ctx) => {
  // Exit SSH session
  setSession({ type: "local" });
  setShell("local");
  setContext("local");
  ctx.pushOutput("Connection to enes.codes closed.");
});

sshKernel.registerCommand("help", async (ctx) => {
  ctx.pushOutput([
    "SSH Commands:",
    "  ls           → list directory contents",
    "  cd <dir>     → change directory",
    "  pwd          → print working directory",
    "  cat <file>   → display file contents",
    "  help         → show this help",
    "  exit         → disconnect from SSH",
    "",
    "You are connected to enes.codes remote server."
  ]);
});

export { sshKernel };