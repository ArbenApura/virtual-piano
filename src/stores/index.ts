// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';
// IMPORTED UTILS
import { initializeMediaStates } from './mediaStates';
import { initializePianoStates } from './pianoStates';
import { initializePlayerStates } from './playerStates';
import { initializeSettingStates } from './settingsStates';

// STATES
export const isInitialized = writable<boolean>(false);
export const stores = { isInitialized };

// UTILS
export const initializeStores = () => {
	initializeMediaStates();
	initializePianoStates();
	initializePlayerStates();
	initializeSettingStates();
	isInitialized.set(true);
};
