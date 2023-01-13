// IMPORTED TYPES
import type { Sampler } from 'tone';
// IMPORTED LIB-UTILS
import { writable, get } from 'svelte/store';

// STATES
export const piano = writable<Sampler>();
export const isPressed = {
	C2: writable<boolean>(false),
	'C#2': writable<boolean>(false),
	D2: writable<boolean>(false),
	'D#2': writable<boolean>(false),
	E2: writable<boolean>(false),
	F2: writable<boolean>(false),
	'F#2': writable<boolean>(false),
	G2: writable<boolean>(false),
	'G#2': writable<boolean>(false),
	A2: writable<boolean>(false),
	'A#2': writable<boolean>(false),
	B2: writable<boolean>(false),
	C3: writable<boolean>(false),
	'C#3': writable<boolean>(false),
	D3: writable<boolean>(false),
	'D#3': writable<boolean>(false),
	E3: writable<boolean>(false),
	F3: writable<boolean>(false),
	'F#3': writable<boolean>(false),
	G3: writable<boolean>(false),
	'G#3': writable<boolean>(false),
	A3: writable<boolean>(false),
	'A#3': writable<boolean>(false),
	B3: writable<boolean>(false),
	C4: writable<boolean>(false),
	'C#4': writable<boolean>(false),
	D4: writable<boolean>(false),
	'D#4': writable<boolean>(false),
	E4: writable<boolean>(false),
	F4: writable<boolean>(false),
	'F#4': writable<boolean>(false),
	G4: writable<boolean>(false),
	'G#4': writable<boolean>(false),
	A4: writable<boolean>(false),
	'A#4': writable<boolean>(false),
	B4: writable<boolean>(false),
	C5: writable<boolean>(false),
	'C#5': writable<boolean>(false),
	D5: writable<boolean>(false),
	'D#5': writable<boolean>(false),
	E5: writable<boolean>(false),
	F5: writable<boolean>(false),
	'F#5': writable<boolean>(false),
	G5: writable<boolean>(false),
	'G#5': writable<boolean>(false),
	A5: writable<boolean>(false),
	'A#5': writable<boolean>(false),
	B5: writable<boolean>(false),
	C6: writable<boolean>(false),
	'C#6': writable<boolean>(false),
	D6: writable<boolean>(false),
	'D#6': writable<boolean>(false),
	E6: writable<boolean>(false),
	F6: writable<boolean>(false),
	'F#6': writable<boolean>(false),
	G6: writable<boolean>(false),
	'G#6': writable<boolean>(false),
	A6: writable<boolean>(false),
	'A#6': writable<boolean>(false),
	B6: writable<boolean>(false),
	C7: writable<boolean>(false)
};
export const pianoStates = { piano, isPressed };

// SUBSCRIPTIONS
Object.keys(isPressed).map((key) => {
	// @ts-ignore
	isPressed[key].subscribe((isPressed) => {
		const piano = get(pianoStates.piano);
		if (piano && isPressed) piano.triggerAttackRelease(key, '2n');
	});
});
