// IMPORTED LIB-TYPES
import type { Track } from '@tonejs/midi';
// IMPORTED TYPES
import type { Note } from '$stores/pianoStates';
// IMPORTED LIB-UTILS
import { get } from 'svelte/store';
import { Midi } from '@tonejs/midi';
// IMPORTED UTILS
import { noteList, pianoStates } from '$stores/pianoStates';
import { playerStates, timeouts, name, composer, duration, isPlaying, maxVelocity } from './states';
import { scores } from '$utils/scores';
import { sleep } from '$utils/helpers';

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
export const getMidi = async () => {
	const score = getScore(get(name));
	const midi = await Midi.fromUrl(score.url);
	return midi;
};
export const playTrack = async (track: Track) => {
	const speed = 1000 / get(playerStates.speed);
	const delay = get(playerStates.delay);
	const piano = get(pianoStates.piano);
	await sleep(delay);
	track.notes.map((note) => {
		const timeout = setTimeout(() => {
			const isPlaying = get(playerStates.isPlaying);
			if (!isPlaying) return;
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
	const speed = 1000 / get(playerStates.speed);
	const delay = get(playerStates.delay);
	const midi = await getMidi();
	const totalDuration = midi.duration * speed + delay;
	duration.set(totalDuration);
	maxVelocity.set(getMaxVelocity(midi.tracks));
	midi.tracks.map(playTrack);
	addTimeout(setTimeout(clearTimeouts, totalDuration));
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
export const resetStates = () => {
	clearTimeouts();
	changeScore();
	maxVelocity.set(1);
	duration.set(0);
};
export const initializePlayerStates = () => {
	if (!get(name)) {
		name.set(scores[0].name);
		composer.set(scores[0].composer);
	}
};
