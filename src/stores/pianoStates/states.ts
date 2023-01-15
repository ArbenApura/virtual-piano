// IMPORTED TYPES
import type { Note, IsPressed } from './types';
// IMPORTED LIB-TYPES
import type { Sampler } from 'tone';
// IMPORTED LIB-UTILS
import { writable, get } from 'svelte/store';

// DEFAULT STATES
export const BPM: number = 200;
export const IS_SUSTAIN: boolean = false;

// STATES
export const piano = writable<Sampler>();
export const bpm = writable<number>(BPM);
export const isSustain = writable<boolean>(IS_SUSTAIN);
export const isPressed: IsPressed = {
	C2: writable<boolean>(false),
	CS2: writable<boolean>(false),
	D2: writable<boolean>(false),
	DS2: writable<boolean>(false),
	E2: writable<boolean>(false),
	F2: writable<boolean>(false),
	FS2: writable<boolean>(false),
	G2: writable<boolean>(false),
	GS2: writable<boolean>(false),
	A2: writable<boolean>(false),
	AS2: writable<boolean>(false),
	B2: writable<boolean>(false),
	C3: writable<boolean>(false),
	CS3: writable<boolean>(false),
	D3: writable<boolean>(false),
	DS3: writable<boolean>(false),
	E3: writable<boolean>(false),
	F3: writable<boolean>(false),
	FS3: writable<boolean>(false),
	G3: writable<boolean>(false),
	GS3: writable<boolean>(false),
	A3: writable<boolean>(false),
	AS3: writable<boolean>(false),
	B3: writable<boolean>(false),
	C4: writable<boolean>(false),
	CS4: writable<boolean>(false),
	D4: writable<boolean>(false),
	DS4: writable<boolean>(false),
	E4: writable<boolean>(false),
	F4: writable<boolean>(false),
	FS4: writable<boolean>(false),
	G4: writable<boolean>(false),
	GS4: writable<boolean>(false),
	A4: writable<boolean>(false),
	AS4: writable<boolean>(false),
	B4: writable<boolean>(false),
	C5: writable<boolean>(false),
	CS5: writable<boolean>(false),
	D5: writable<boolean>(false),
	DS5: writable<boolean>(false),
	E5: writable<boolean>(false),
	F5: writable<boolean>(false),
	FS5: writable<boolean>(false),
	G5: writable<boolean>(false),
	GS5: writable<boolean>(false),
	A5: writable<boolean>(false),
	AS5: writable<boolean>(false),
	B5: writable<boolean>(false),
	C6: writable<boolean>(false),
	CS6: writable<boolean>(false),
	D6: writable<boolean>(false),
	DS6: writable<boolean>(false),
	E6: writable<boolean>(false),
	F6: writable<boolean>(false),
	FS6: writable<boolean>(false),
	G6: writable<boolean>(false),
	GS6: writable<boolean>(false),
	A6: writable<boolean>(false),
	AS6: writable<boolean>(false),
	B6: writable<boolean>(false),
	C7: writable<boolean>(false),
};
export const pianoStates = { piano, bpm, isSustain, isPressed };

// SUBSCRIPTIONS
Object.keys(isPressed).map((key) => {
	isPressed[key as Note].subscribe((isPressed) => {
		try {
			const piano = get(pianoStates.piano);
			const note = key.replace('S', '#');
			if (!piano) return;
			if (get(isSustain)) {
				if (isPressed) piano.triggerAttackRelease(note, '2n');
			} else {
				if (isPressed) {
					piano.triggerAttack(note);
				} else piano.triggerRelease(note, '+16n');
			}
		} catch {}
	});
});
