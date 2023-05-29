// IMPORTED TYPES
import type { Orientation } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';

// STATES
export const visibility = {
	keyboard: writable<boolean>(false),
	keyboardNoteHint: writable<boolean>(true),
	keyboardBindHint: writable<boolean>(true),
	lines: writable<boolean>(true),
	highlight: writable<boolean>(false),
	visualizer: writable<boolean>(false),
	playerDetails: writable<boolean>(true),
	progress: writable<boolean>(true),
};
export const orientation = writable<Orientation>('landscape');
export const isFullScreen = writable<boolean>(false);
export const isFullScreenSupported = writable<boolean>(false);
export const settingsStates = { visibility, orientation, isFullScreen, isFullScreenSupported };
