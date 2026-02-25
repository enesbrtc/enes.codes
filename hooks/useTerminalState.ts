import { useState, useEffect } from 'react';
import { getTerminalOpen, subscribeToTerminalState } from '../lib/terminalState';

export function useTerminalState() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(getTerminalOpen());

  useEffect(() => {
    const unsubscribe = subscribeToTerminalState(setIsTerminalOpen);
    return unsubscribe;
  }, []);

  return isTerminalOpen;
}