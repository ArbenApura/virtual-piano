// IMPORTED TYPES
import type { Speed } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';
// IMPORTED UTILS
import { playScore, clearTimeouts, changeScore } from './utils';

// STATES
export const name = writable<string>();
export const composer = writable<string>();
export const speed = writable<Speed>(1);
export const maxVelocity = writable<number>(1);
export const isPlaying = writable<boolean>();
export const timeouts = writable<NodeJS.Timeout[]>([]);
export const playerStates = { name, composer, speed, maxVelocity, isPlaying, timeouts };

// SUBSCRIPTIONS
isPlaying.subscribe((isPlaying) => {
	try {
		if (!isPlaying) {
			clearTimeouts();
			changeScore();
			speed.set(1);
			maxVelocity.set(1);
		} else playScore();
	} catch {}
});
