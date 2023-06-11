// IMPORTED TYPES
import type { NoteList, Boundary } from './types';
// IMPORTED LIB-TYPES
import type { Sampler } from 'tone';
// IMPORTED LIB-UTILS
import { writable, get } from 'svelte/store';
// IMPORTED UTILS
import { isPlaying } from '$stores/playerStates';
import { pianoKeys, pianoNotes } from '$utils/pianoKeys';
import { createParticles } from '$stores/particleStates';

// STATES
export const piano = writable<Sampler>();
export const isSustain = writable<boolean>();
export const noteList: NoteList = {} as NoteList;
pianoKeys.map((key) => {
	noteList[key.note] = {
		...key,
		isPressing: writable<boolean>(),
		velocity: writable<number>(1),
		boundaries: writable<Boundary[]>([]),
	};
});
export const pianoStates = { piano, isSustain, noteList };

// SUBSCRIPTIONS
pianoNotes.map((key) => {
	const note = noteList[key];
	note.isPressing.subscribe((isPressing) => {
		if (isPressing) createParticles(note);
		const piano = get(pianoStates.piano);
		const noteKey = key.replace('S', '#');
		const velocity = get(noteList[key].velocity);
		if (!piano) return;
		if (isPressing) piano.triggerAttack(noteKey, undefined, velocity);
		else piano.triggerRelease(noteKey, get(isSustain) || !get(isPlaying) ? '+2n' : '+16n');
	});
});
