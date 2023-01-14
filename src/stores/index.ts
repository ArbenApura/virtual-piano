// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';
// IMPORTED UTILS
import { mediaStates, initializeMediaStates } from './mediaStates';
import { pianoStates, initializePianoStates } from './pianoStates';
import { playerStates, initializePlayerStates } from './playerStates';
export { mediaStates, pianoStates, playerStates };

// STATES
export const isInitialized = writable<boolean>(false);
export const stores = { isInitialized };

// UTILS
export const initializeStores = () => {
	initializeMediaStates();
	initializePianoStates();
	initializePlayerStates();
	isInitialized.set(true);
};
