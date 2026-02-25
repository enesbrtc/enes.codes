export type GameState = 'idle' | 'booting' | 'active' | 'completed';

export interface GameSequence {
  id: string;
  text: string;
  delay: number;
}

export const BOOT_SEQUENCE: GameSequence[] = [
  { id: 'init', text: '> initializing engineer profile...', delay: 500 },
  { id: 'loading', text: '> loading systems...', delay: 800 },
  { id: 'validating', text: '> validating automation mindset...', delay: 600 },
  { id: 'confirmed', text: '> identity confirmed', delay: 400 },
];

export const SUCCESS_MESSAGE = '> SYSTEM ACCESS GRANTED';

export const TARGET_COMMAND = 'deploy';

export const STORAGE_KEY = 'avatarUnlocked';

export function isAvatarUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function setAvatarUnlocked(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, 'true');
}