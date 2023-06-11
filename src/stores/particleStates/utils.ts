// IMPORTED TYPES
import type { NoteState } from '$stores/pianoStates';
import type { Particle } from './types';
// IMPORTED LIB-UTILS
import { get } from 'svelte/store';
// IMPORTED UTILS
import { getRandomInt } from '$utils/helpers';
import { particles, PARTICLE_SIZE, PARTICLE_SET_COUNT } from './states';
import { isAudioOnly } from '$stores/settingsStates';

// UTILS
export const createParticles = (note: NoteState) => {
	if (!get(note.isPressing) || get(isAudioOnly)) return;
	const sets: Particle[] = [];
	const boundaries = get(note.boundaries);
	const boundary = boundaries[1] ? 1 : 0;
	const xMin = boundaries[boundary].x;
	const xMax = boundaries[boundary].x + boundaries[boundary].width;
	for (let i = 0; i < PARTICLE_SET_COUNT; i++) {
		const x = getRandomInt(xMin, xMax - PARTICLE_SIZE);
		const y = getRandomInt(560, 540);
		const velocity = getRandomInt(1, 4);
		const particle: Particle = {
			x,
			y,
			velocity,
			opacity: 1,
			color: note.type,
		};
		sets.push(particle);
	}
	particles.update((particles) => [...particles, ...sets]);
	setTimeout(() => createParticles(note), 200);
};
