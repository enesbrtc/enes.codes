import { getSession } from "../session/sessionManager";
import { handleAuthInput } from "../ssh/sshSession";
import { sshKernel } from "../ssh/sshKernel";
import { getKernel } from "../kernel/kernel";
import { getContext } from "../shell/shellContext";

export type DispatchResult = {
  type: "auth_username" | "auth_password" | "auth_completed" | "command_executed";
} | null;

export function dispatchInput(input: string): Promise<DispatchResult> {
  const session = getSession();

  if (session.type === "ssh") {
    if (session.state === "username") {
      return handleAuthInput(input).then(() => ({ type: "auth_username" }));
    }

    if (session.state === "password") {
      return handleAuthInput(input).then(() => ({ type: "auth_password" }));
    }

    if (session.state === "shell") {
      return sshKernel.runCommand(input).then(() => ({ type: "command_executed" }));
    }
  }

  // Local shell - execute regular commands
  const context = getContext();
  const kernel = getKernel();

  return kernel.runCommand(input, context === "ssh" ? "ssh" : context === "engineer" ? "engineer" : "local")
    .then(() => ({ type: "command_executed" as const }))
    .catch(() => ({ type: "command_executed" as const })); // Still return success for UI purposes
}