// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';

// STATES
export const visibility = {
	keyboard: writable<boolean>(true),
	keyboardNoteHint: writable<boolean>(true),
	keyboardBindHint: writable<boolean>(true),
	highlight: writable<boolean>(true),
	visualizer: writable<boolean>(true),
	playerDetails: writable<boolean>(true),
};
export const isFullScreen = writable<boolean>(false);
export const isFullScreenSupported = writable<boolean>(false);
export const settingStates = { visibility, isFullScreen, isFullScreenSupported };
