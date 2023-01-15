// IMPORTED TYPES
import type { Visibility } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';

// DEFAULT STATES
export const DEFAULT_VISIBILITY: Visibility = {
	keyboardHint: { note: true, bind: true },
	screenHint: { note: false, bind: false },
};

// STATES
export const visibility = writable<Visibility>(DEFAULT_VISIBILITY);
export const settingStates = { visibility };
