// IMPORTED TYPES
import type { Speed, Difficulty } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';
// IMPORTED UTILS
import { playScore, clearTimeouts } from './utils';

// STATES
export const name = writable<string>('Moonlight Sonata (3rdMovement)');
export const difficulty = writable<Difficulty>('advanced');
export const speed = writable<Speed>(1);
export const isPlaying = writable<boolean>();
export const timeouts = writable<NodeJS.Timeout[]>([]);
export const playerStates = { name, difficulty, speed, isPlaying, timeouts };

// SUBSCRIPTIONS
isPlaying.subscribe((isPlaying) => (isPlaying ? playScore() : clearTimeouts()));
