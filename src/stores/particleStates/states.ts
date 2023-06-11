// IMPORTED TYPES
import type { Particle } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';

// DEFAULT STATES
export const PARTICLE_SIZE = 4;
export const PARTICLE_SET_COUNT = 10;

// STATES
export const particles = writable<Particle[]>([]);
export const particleStates = { particles };
