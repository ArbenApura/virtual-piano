// IMPORTED TYPES
import type { Note } from '$stores/pianoStates';

// TYPES
export type NoteItem = {
	note: Note;
	duration?: number;
};
export type SongItem = {
	notes: NoteItem[];
	wait?: number;
};
export type Song = SongItem[];
