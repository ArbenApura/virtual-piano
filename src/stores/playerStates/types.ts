// IMPORTED TYPES
import type { Note } from '$stores/pianoStates';

// TYPES
export type NoteItem = [Note, number?] | Note;
export type SongItem = [NoteItem[], number?] | number | ((interval: number) => number);
export type Song = {
	name: string;
	interval: number;
	items: SongItem[];
};
