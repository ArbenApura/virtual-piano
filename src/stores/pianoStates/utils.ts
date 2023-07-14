// IMPORTED LIB-UTILS
import { Sampler } from 'tone';
// IMPORTED UTILS
import { piano } from './states';

export const getSampler = () =>
	new Sampler({
		urls: {
			A0: 'A0v10.ogg',
			A1: 'A1v10.ogg',
			A2: 'A2v10.ogg',
			A3: 'A3v10.ogg',
			A4: 'A4v10.ogg',
			A5: 'A5v10.ogg',
			A6: 'A6v10.ogg',
			A7: 'A7v10.ogg',
			C1: 'C1v10.ogg',
			C2: 'C2v10.ogg',
			C3: 'C3v10.ogg',
			C4: 'C4v10.ogg',
			C5: 'C5v10.ogg',
			C6: 'C6v10.ogg',
			C7: 'C7v10.ogg',
			C8: 'C8v10.ogg',
			'D#1': 'Ds1v10.ogg',
			'D#2': 'Ds2v10.ogg',
			'D#3': 'Ds3v10.ogg',
			'D#4': 'Ds4v10.ogg',
			'D#5': 'Ds5v10.ogg',
			'D#6': 'Ds6v10.ogg',
			'D#7': 'Ds7v10.ogg',
			'F#1': 'Fs1v10.ogg',
			'F#2': 'Fs2v10.ogg',
			'F#3': 'Fs3v10.ogg',
			'F#4': 'Fs4v10.ogg',
			'F#5': 'Fs5v10.ogg',
			'F#6': 'Fs6v10.ogg',
			'F#7': 'Fs7v10.ogg',
		},
		release: 1,
		baseUrl: '/audio-samples/piano/',
	}).toDestination();

export const setPianoSampler = () => {
	piano.set(getSampler());
};
export const initializePianoStates = () => {
	setPianoSampler();
};
