// IMPORTED TYPES
import type { Speed } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';
// IMPORTED UTILS
import { playScore, resetStates } from './utils';

// STATES
export const name = writable<string>();
export const composer = writable<string>();
export const speed = writable<Speed>(0.5);
export const delay = writable<number>(5000);
export const duration = writable<number>(0);
export const maxVelocity = writable<number>(1);
export const isPlaying = writable<boolean>();
export const timeouts = writable<NodeJS.Timeout[]>([]);
export const playerStates = {
	name,
	composer,
	speed,
	delay,
	duration,
	maxVelocity,
	isPlaying,
	timeouts,
};

// SUBSCRIPTIONS
isPlaying.subscribe((isPlaying) => {
	try {
		if (!isPlaying) resetStates();
		else playScore();
	} catch {}
});
