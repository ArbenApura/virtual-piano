// IMPORTED TYPES
import type { Orientation } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';

// STATES
export const visibility = {
	keyboard: writable<boolean>(true),
	keyboardNoteHint: writable<boolean>(true),
	keyboardBindHint: writable<boolean>(true),
	lines: writable<boolean>(true),
	highlight: writable<boolean>(true),
	visualizer: writable<boolean>(true),
	playerDetails: writable<boolean>(true),
	progress: writable<boolean>(true),
};
export const isAudioOnly = writable<boolean>(false);
export const orientation = writable<Orientation>('landscape');
export const isFullScreen = writable<boolean>(false);
export const isFullScreenSupported = writable<boolean>(false);
export const settingsStates = {
	isAudioOnly,
	visibility,
	orientation,
	isFullScreen,
	isFullScreenSupported,
};
