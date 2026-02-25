let listeners: ((enabled: boolean) => void)[] = [];

// Initialize global flag if engineer mode is already enabled
if (typeof window !== 'undefined' && getEngineerMode()) {
  (window as any).ENGINEER_MODE = true;
}

export function getEngineerMode() {
  return localStorage.getItem("engineerMode") === "true";
}

export function enableEngineerMode() {
  localStorage.setItem("engineerMode", "true");
  if (typeof window !== 'undefined') {
    (window as any).ENGINEER_MODE = true;
  }
  listeners.forEach(l => l(true));
}

export function subscribeEngineerMode(cb: (enabled: boolean) => void) {
  listeners.push(cb);
}