// IMPORTED LIB-TYPES
import type { Track } from '@tonejs/midi';
// IMPORTED TYPES
import type { Note } from '$stores/pianoStates';
import type { Score, DifficultySource } from './types';
// IMPORTED LIB-UTILS
import { get } from 'svelte/store';
import { Midi } from '@tonejs/midi';
// IMPORTED UTILS
import { isPressed } from '$stores/pianoStates/states';
import { playerStates, timeouts, name, difficulty, isPlaying } from './states';
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
export const getScore = (name: string) => {
	for (let score of scores) if (score.name === name) return score;
	throw new Error('Score was not found!');
};
export const getDifficulty = (score: Score) => {
	if (!(get(difficulty) in score.difficulty)) throw new Error('Difficulty was not found!');
	return score.difficulty[get(difficulty)] as DifficultySource;
};
export const playTrack = (track: Track) => {
	const speed = 1000 / get(playerStates.speed);
	track.notes.map((note) => {
		const timeout = setTimeout(() => {
			const name = note.name.replace('#', 'S') as Note;
			if (name in isPressed) {
				isPressed[name].set(true);
				setTimeout(() => isPressed[name].set(false), note.duration * speed);
			}
		}, note.time * speed);
		addTimeout(timeout);
	});
};
export const playScore = async () => {
	await sleep(1000);
	const score = getScore(get(name));
	const difficulty = getDifficulty(score);
	const midi = await Midi.fromUrl(difficulty.url);
	midi.tracks.map(playTrack);
	addTimeout(setTimeout(clearTimeouts, midi.duration * 1000));
};
export const toggleIsPlaying = () =>
	isPlaying.update((isPlaying) => {
		if (!isPlaying) {
			difficulty.set('advanced');
			switch (get(name)) {
				case 'Moonlight Sonata (3rdMovement)':
					name.set('Nocturne Op.9 No.2');
					break;
				case 'Nocturne Op.9 No.2':
					name.set('Turkish March (Ronda Alla Turca)');
					difficulty.set('intermediate');
					break;
				case 'Turkish March (Ronda Alla Turca)':
					name.set('Flight of the Bumblebee');
					break;
				case 'Flight of the Bumblebee':
					name.set('Habanera from Carmen');
					difficulty.set('intermediate');
					break;
				case 'Habanera from Carmen':
					name.set('Moonlight Sonata (3rdMovement)');
					break;
				default:
					name.set('Moonlight Sonata (3rdMovement)');
			}
		}
		return !isPlaying;
	});
export const initializePlayerStates = () => {};
