// IMPORTED LIB-TYPES
import type { Writable } from 'svelte/store';

// TYPES
export type Note =
	| 'C2'
	| 'CS2'
	| 'D2'
	| 'DS2'
	| 'E2'
	| 'F2'
	| 'FS2'
	| 'G2'
	| 'GS2'
	| 'A2'
	| 'AS2'
	| 'B2'
	| 'C3'
	| 'CS3'
	| 'D3'
	| 'DS3'
	| 'E3'
	| 'F3'
	| 'FS3'
	| 'G3'
	| 'GS3'
	| 'A3'
	| 'AS3'
	| 'B3'
	| 'C4'
	| 'CS4'
	| 'D4'
	| 'DS4'
	| 'E4'
	| 'F4'
	| 'FS4'
	| 'G4'
	| 'GS4'
	| 'A4'
	| 'AS4'
	| 'B4'
	| 'C5'
	| 'CS5'
	| 'D5'
	| 'DS5'
	| 'E5'
	| 'F5'
	| 'FS5'
	| 'G5'
	| 'GS5'
	| 'A5'
	| 'AS5'
	| 'B5'
	| 'C6'
	| 'CS6'
	| 'D6'
	| 'DS6'
	| 'E6'
	| 'F6'
	| 'FS6'
	| 'G6'
	| 'GS6'
	| 'A6'
	| 'AS6'
	| 'B6'
	| 'C7';
export type PianoKey = {
	type: 'white' | 'black';
	note: Note;
	bind: string;
	haveSharp: boolean;
};
export type PianoCluster = PianoKey[];
export type IsPressed = {
	[K in Note]: Writable<boolean>;
};
