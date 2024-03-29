// IMPORTED LIB-TYPES
import type { Subdivision } from 'tone/build/esm/core/type/Units';
// IMPORTED TYPES
import type { Speed } from './types';
// IMPORTED LIB-UTILS
import { get, writable } from 'svelte/store';
// IMPORTED UTILS
import { playScore, resetStates } from './utils';
import { isInitialized } from '..';

// DEFAULT STATES
export const DEFAULT_RELEASE_TIME: Subdivision = '32n';

// STATES
export const name = writable<string>();
export const composer = writable<string>();
export const releaseTime = writable<Subdivision>(DEFAULT_RELEASE_TIME);
export const speed = writable<Speed>(1);
export const delay = writable<number>(1000);
export const duration = writable<number>(0);
export const maxVelocity = writable<number>(1);
export const isPlaying = writable<boolean>();
export const isChanging = writable<boolean>();
export const timeouts = writable<NodeJS.Timeout[]>([]);
export const playerStates = {
	name,
	composer,
	speed,
	delay,
	duration,
	maxVelocity,
	isPlaying,
	isChanging,
	timeouts,
};

// SUBSCRIPTIONS
isPlaying.subscribe((isPlaying) => {
	try {
		if (!get(isInitialized)) return;
		if (!isPlaying) resetStates();
		else playScore();
	} catch {}
});
