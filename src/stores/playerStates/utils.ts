// IMPORTED LIB-TYPES
import type { Track } from '@tonejs/midi';
// IMPORTED TYPES
import type { Note } from '$stores/pianoStates';
// IMPORTED LIB-UTILS
import { get } from 'svelte/store';
import { Midi } from '@tonejs/midi';
// IMPORTED UTILS
import { noteList, pianoStates } from '$stores/pianoStates/states';
import { playerStates, timeouts, name, composer, isPlaying, maxVelocity } from './states';
import { sleep } from '$utils/helpers';
import { scores } from '$utils/scores';

// UTILS
export const clearTimeouts = () => {
	get(timeouts).map(clearTimeout);
	timeouts.set([]);
	isPlaying.set(false);
};
export const addTimeout = (timeout: NodeJS.Timeout) =>
	timeouts.update((timeouts) => [...timeouts, timeout]);
export const getMaxVelocity = (tracks: Track[]) => {
	let max = 0;
	tracks.map((track) => track.notes.map((note) => note.velocity > max && (max = note.velocity)));
	return max;
};
export const getScore = (name: string) => {
	for (let score of scores) if (score.name === name) return score;
	throw new Error('Score was not found!');
};
export const playTrack = (track: Track) => {
	const speed = 1000 / get(playerStates.speed);
	track.notes.map((note) => {
		const piano = get(pianoStates.piano);
		const timeout = setTimeout(() => {
			const name = note.name.replace('#', 'S') as Note;
			if (name in noteList) {
				noteList[name].velocity.set(note.velocity);
				noteList[name].isPressing.set(true);
				setTimeout(() => {
					noteList[name].velocity.set(1);
					noteList[name].isPressing.set(false);
				}, note.duration * speed);
			} else {
				piano.triggerAttack(note.name, undefined, note.velocity);
				setTimeout(() => piano.triggerRelease(note.name, '+16n'), note.duration * speed);
			}
		}, note.time * speed);
		addTimeout(timeout);
	});
};
export const playScore = async () => {
	await sleep(1000);
	const score = getScore(get(name));
	const midi = await Midi.fromUrl(score.url);
	maxVelocity.set(getMaxVelocity(midi.tracks));
	midi.tracks.map(playTrack);
	addTimeout(setTimeout(clearTimeouts, midi.duration * 1000));
};
export const changeScore = () => {
	for (let i = 0; i < scores.length; i++) {
		if (scores[i].name !== get(name)) continue;
		if (i + 1 === scores.length) {
			name.set(scores[0].name);
			composer.set(scores[0].composer);
		} else {
			name.set(scores[i + 1].name);
			composer.set(scores[i + 1].composer);
		}
		break;
	}
};
export const toggleIsPlaying = () => isPlaying.update((v) => !v);
export const initializePlayerStates = () => {
	if (!get(name)) {
		name.set(scores[0].name);
		composer.set(scores[0].composer);
	}
};
