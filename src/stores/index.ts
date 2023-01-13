// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';
// IMPORTED UTILS
import { mediaStates, initializeMediaStates } from './mediaStates';
import { initializePianoStates, pianoStates } from './pianoStates';
export { mediaStates, pianoStates };

// STATES
export const isInitialized = writable<boolean>(false);
export const stores = { isInitialized };

// UTILS
export const initializeStores = () => {
	initializeMediaStates();
	initializePianoStates();
	isInitialized.set(true);
};
