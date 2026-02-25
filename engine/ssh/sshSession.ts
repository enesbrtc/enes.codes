import { setSession, getSession } from "../session/sessionManager";
import { terminalBuffer } from "../kernel/terminalBuffer";

export function connect(host: string): void {
  setSession({
    type: "ssh",
    state: "username",
    host
  });
}

export function handleAuthInput(input: string): Promise<void> {
  return new Promise((resolve) => {
    const session = getSession();

    if (session.type === "ssh") {
      if (session.state === "username") {
        // Set username and move to password state
        setSession({
          type: "ssh",
          state: "password",
          username: input.trim(),
          host: "enes.codes"
        });
        terminalBuffer.push("password: ");
        resolve();
      } else if (session.state === "password") {
        // Accept password and move to shell state
        setSession({
          type: "ssh",
          state: "shell",
          username: session.username,
          host: "enes.codes",
          cwd: "/home/enes"
        });
        terminalBuffer.push("Welcome to enes.codes");
        terminalBuffer.push("");
        resolve();
      }
    }
    resolve();
  });
}