type Session =
  | { type: "local" }
  | { type: "ssh"; state: "username"; host: string }
  | { type: "ssh"; state: "password"; username: string; host: string }
  | { type: "ssh"; state: "shell"; username: string; host: string; cwd: string };

let activeSession: Session = {
  type: "local"
};

const listeners = new Set<(session: Session) => void>();

export function getSession(): Session {
  return activeSession;
}

export function setSession(newSession: Session): void {
  activeSession = newSession;
  listeners.forEach(fn => fn(activeSession));
}

export function subscribeSession(fn: (session: Session) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}