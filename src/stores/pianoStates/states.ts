// IMPORTED TYPES
import type { Note, NoteList, Boundary } from './types';
// IMPORTED LIB-TYPES
import type { Sampler } from 'tone';
// IMPORTED LIB-UTILS
import { writable, get } from 'svelte/store';
// IMPORTED UTILS
import { isPlaying } from '$stores/playerStates';
import { pianoKeys } from '$utils/pianoKeys';

// STATES
export const piano = writable<Sampler>();
export const isSustain = writable<boolean>();
export const noteList: NoteList = {} as NoteList;
pianoKeys.map((key) => {
	noteList[key.note] = {
		isPressing: writable<boolean>(),
		boundaries: writable<Boundary[]>([]),
	};
});
export const pianoStates = { piano, isSustain, noteList };

// SUBSCRIPTIONS
Object.keys(noteList).map((key) => {
	noteList[key as Note].isPressing.subscribe((isPressing) => {
		const piano = get(pianoStates.piano);
		const note = key.replace('S', '#');
		if (!piano) return;
		if (isPressing) piano.triggerAttack(note);
		else piano.triggerRelease(note, get(isSustain) || !get(isPlaying) ? '+2n' : '+16n');
	});
});
