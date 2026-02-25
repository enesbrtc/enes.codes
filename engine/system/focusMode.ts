// Global focus mode state management
export interface FocusModeState {
  active: boolean;
}

let focusModeActive = false;
let focusModeListeners: ((active: boolean) => void)[] = [];

export function getFocusModeActive(): boolean {
  return focusModeActive;
}

export function enableFocusMode() {
  if (focusModeActive) return;

  focusModeActive = true;

  // Freeze page scrolling
  document.body.style.overflow = "hidden";

  // Notify listeners
  focusModeListeners.forEach(listener => listener(true));
}

export function disableFocusMode() {
  if (!focusModeActive) return;

  focusModeActive = false;

  // Restore page scrolling
  document.body.style.overflow = "";

  // Notify listeners
  focusModeListeners.forEach(listener => listener(false));
}

export function subscribeToFocusMode(listener: (active: boolean) => void): () => void {
  focusModeListeners.push(listener);

  // Return unsubscribe function
  return () => {
    const index = focusModeListeners.indexOf(listener);
    if (index > -1) {
      focusModeListeners.splice(index, 1);
    }
  };
}