// IMPORTED TYPES
import type { Sampler } from 'tone';
// IMPORTED LIB-UTILS
import { writable, get } from 'svelte/store';

// STATES
export const piano = writable<Sampler>();
export const C2 = writable<boolean>(false);
export const CS2 = writable<boolean>(false);
export const D2 = writable<boolean>(false);
export const DS2 = writable<boolean>(false);
export const E2 = writable<boolean>(false);
export const F2 = writable<boolean>(false);
export const FS2 = writable<boolean>(false);
export const G2 = writable<boolean>(false);
export const GS2 = writable<boolean>(false);
export const A2 = writable<boolean>(false);
export const AS2 = writable<boolean>(false);
export const B2 = writable<boolean>(false);
export const C3 = writable<boolean>(false);
export const CS3 = writable<boolean>(false);
export const D3 = writable<boolean>(false);
export const DS3 = writable<boolean>(false);
export const E3 = writable<boolean>(false);
export const F3 = writable<boolean>(false);
export const FS3 = writable<boolean>(false);
export const G3 = writable<boolean>(false);
export const GS3 = writable<boolean>(false);
export const A3 = writable<boolean>(false);
export const AS3 = writable<boolean>(false);
export const B3 = writable<boolean>(false);
export const C4 = writable<boolean>(false);
export const CS4 = writable<boolean>(false);
export const D4 = writable<boolean>(false);
export const DS4 = writable<boolean>(false);
export const E4 = writable<boolean>(false);
export const F4 = writable<boolean>(false);
export const FS4 = writable<boolean>(false);
export const G4 = writable<boolean>(false);
export const GS4 = writable<boolean>(false);
export const A4 = writable<boolean>(false);
export const AS4 = writable<boolean>(false);
export const B4 = writable<boolean>(false);
export const C5 = writable<boolean>(false);
export const CS5 = writable<boolean>(false);
export const D5 = writable<boolean>(false);
export const DS5 = writable<boolean>(false);
export const E5 = writable<boolean>(false);
export const F5 = writable<boolean>(false);
export const FS5 = writable<boolean>(false);
export const G5 = writable<boolean>(false);
export const GS5 = writable<boolean>(false);
export const A5 = writable<boolean>(false);
export const AS5 = writable<boolean>(false);
export const B5 = writable<boolean>(false);
export const C6 = writable<boolean>(false);
export const CS6 = writable<boolean>(false);
export const D6 = writable<boolean>(false);
export const DS6 = writable<boolean>(false);
export const E6 = writable<boolean>(false);
export const F6 = writable<boolean>(false);
export const FS6 = writable<boolean>(false);
export const G6 = writable<boolean>(false);
export const GS6 = writable<boolean>(false);
export const A6 = writable<boolean>(false);
export const AS6 = writable<boolean>(false);
export const B6 = writable<boolean>(false);
export const C7 = writable<boolean>(false);
export const isPressed = {
	C2,
	CS2,
	D2,
	DS2,
	E2,
	F2,
	FS2,
	G2,
	GS2,
	A2,
	AS2,
	B2,
	C3,
	CS3,
	D3,
	DS3,
	E3,
	F3,
	FS3,
	G3,
	GS3,
	A3,
	AS3,
	B3,
	C4,
	CS4,
	D4,
	DS4,
	E4,
	F4,
	FS4,
	G4,
	GS4,
	A4,
	AS4,
	B4,
	C5,
	CS5,
	D5,
	DS5,
	E5,
	F5,
	FS5,
	G5,
	GS5,
	A5,
	AS5,
	B5,
	C6,
	CS6,
	D6,
	DS6,
	E6,
	F6,
	FS6,
	G6,
	GS6,
	A6,
	AS6,
	B6,
	C7
};
export const pianoStates = { piano, isPressed };

// SUBSCRIPTIONS
Object.keys(isPressed).map((key) => {
	// @ts-ignore
	isPressed[key].subscribe((isPressed) => {
		try {
			const piano = get(pianoStates.piano);
			const note = key.replace('S', '#');
			if (piano && isPressed) piano.triggerAttackRelease(note, '2n');
		} catch {}
	});
});
