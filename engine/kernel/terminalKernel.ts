import { terminalBuffer } from "./terminalBuffer";
import { detectIntent, suggestSimilarCommand } from "../personality/intentResolver";

export type CommandScope = "global" | "engineer" | "ssh";

export interface CommandContext {
  args: string[];
  raw: string;
  environment: "local" | "engineer" | "ssh";
  setInteractiveMode?: (mode: string | null) => void;
  pushOutput: (content: string | string[]) => void;
}

export type CommandHandler = (
  ctx: CommandContext
) => Promise<void>;

interface CommandRegistration {
  handler: CommandHandler;
  scope: CommandScope;
  hidden?: boolean;
}

const registry = new Map<string, CommandRegistration>();
let activeInteractiveMode: string | null = null;
let interactiveModeHandler: ((input: string) => void) | null = null;

export function registerCommand(
  name: string,
  handler: CommandHandler,
  options: { scope?: CommandScope; hidden?: boolean } = {}
) {
  const scope = options.scope || "global";
  registry.set(name, { handler, scope, ...options });
}

export function getActiveInteractiveMode(): string | null {
  return activeInteractiveMode;
}

export function setInteractiveMode(mode: string | null, handler?: (input: string) => void) {
  activeInteractiveMode = mode;
  interactiveModeHandler = handler || null;
}

export function handleInteractiveInput(input: string): string[] | null {
  if (interactiveModeHandler) {
    interactiveModeHandler(input);
    return null; // Interactive mode handles its own output
  }
  return null;
}

export function listCommands(environment?: "local" | "engineer" | "ssh"): { name: string; hidden: boolean; scope: CommandScope }[] {
  return Array.from(registry.entries())
    .filter(([_, reg]) => {
      if (!environment) return true;
      // Global commands work everywhere
      if (reg.scope === "global") return true;
      // Environment-specific commands only work in their environment
      if (reg.scope === "engineer" && environment === "engineer") return true;
      if (reg.scope === "ssh" && environment === "ssh") return true;
      return false;
    })
    .map(([name, reg]) => ({
      name,
      hidden: reg.hidden || false,
      scope: reg.scope
    }));
}

export async function runCommand(input: string, environment: "local" | "engineer" | "ssh"): Promise<void> {
  const trimmed = input.trim();
  if (!trimmed) return;

  // Handle interactive mode input
  if (activeInteractiveMode) {
    const result = handleInteractiveInput(trimmed);
    if (result !== null) {
      terminalBuffer.pushMultiple(result);
    }
    return;
  }

  // Parse command and arguments
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  const registration = registry.get(command);
  if (!registration) {
    // Command not found - try intent detection and suggestions
    const availableCommands = Array.from(registry.keys());
    const suggestion = suggestSimilarCommand(command, availableCommands);
    const intent = detectIntent(trimmed);

    const output = [`${command}: command not found`];

    if (suggestion) {
      output.push(`Did you mean: ${suggestion} ?`);
    } else if (intent) {
      output.push(intent.suggestion);
    }

    terminalBuffer.pushMultiple(output);
    return;
  }

  // Commands are now available in all environments

  try {
    const context: CommandContext = {
      args,
      raw: trimmed,
      environment,
      setInteractiveMode,
      pushOutput: (content: string | string[]) => {
        if (Array.isArray(content)) {
          terminalBuffer.pushMultiple(content);
        } else {
          terminalBuffer.push(content);
        }
      }
    };

    await registration.handler(context);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    terminalBuffer.push(`Error executing ${command}: ${errorMessage}`);
  }
}

export function resetKernel() {
  activeInteractiveMode = null;
  interactiveModeHandler = null;
}