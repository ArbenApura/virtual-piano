// IMPORTED LIB-TYPES
import type { Track } from '@tonejs/midi';
import type { Sampler } from 'tone';
import type { Note as ToneNote } from '@tonejs/midi/dist/Note';
import type { Subdivision } from 'tone/build/esm/core/type/Units';
import type { TempoEvent } from '@tonejs/midi/dist/Header';
// IMPORTED TYPES
import type { Note } from '$stores/pianoStates';
// IMPORTED LIB-UTILS
import { get } from 'svelte/store';
import { Midi } from '@tonejs/midi';
// IMPORTED UTILS
import { isAudioOnly, settingsStates } from '$stores/settingsStates';
import { noteList, pianoStates } from '$stores/pianoStates';
import {
	playerStates,
	timeouts,
	name,
	composer,
	duration,
	increment,
	isPlaying,
	maxVelocity,
	isChanging,
	releaseTime,
	DEFAULT_RELEASE_TIME,
	VELOCITY_REDUCTION,
} from './states';
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
export const triggerAttack = (
	piano: Sampler,
	note: ToneNote,
	duration: number,
	releaseTime: Subdivision,
) => {
	piano.triggerAttack(note.name, undefined, note.velocity * VELOCITY_REDUCTION);
	setTimeout(() => piano.triggerRelease(note.name, '+' + releaseTime), duration);
};
export const playTrack = async (track: Track) => {
	const isAudioOnly = get(settingsStates.isAudioOnly);
	const speed = isAudioOnly ? 1000 : 1000 / get(playerStates.speed);
	const delay = isAudioOnly ? 1000 : get(playerStates.delay);
	const releaseDelay = 50 / get(playerStates.speed);
	const releaseTime = get(playerStates.releaseTime);
	const piano = get(pianoStates.piano);
	isChanging.set(true);
	await sleep(delay);
	isChanging.set(false);
	track.notes.map((note) => {
		const tempDuration = note.duration * speed - releaseDelay;
		const duration = tempDuration < releaseDelay ? releaseDelay : tempDuration;
		const timeout = setTimeout(() => {
			const name = note.name.replace('#', 'S') as Note;
			if (name in noteList) {
				noteList[name].velocity.set(note.velocity);
				noteList[name].duration.set(duration);
				noteList[name].isPressing.set(true);
				setTimeout(() => {
					noteList[name].velocity.set(1);
					noteList[name].duration.set(0);
					noteList[name].isPressing.set(false);
				}, duration);
			} else triggerAttack(piano, note, duration, releaseTime);
		}, note.time * speed);
		addTimeout(timeout);
	});
};
export const playScore = async () => {
	const speed = get(isAudioOnly) ? 1000 : 1000 / get(playerStates.speed);
	const delay = get(isAudioOnly) ? 1000 : get(playerStates.delay);
	const midi = await getMidi();
	const totalDuration = midi.duration * speed + delay;
	duration.set(totalDuration);
	maxVelocity.set(getMaxVelocity(midi.tracks));
	midi.tracks.map(playTrack);
	addTimeout(setTimeout(clearTimeouts, totalDuration));
};
export const changeScore = () => {
	get(timeouts).map(clearTimeout);
	timeouts.set([]);
	for (let i = 0; i < scores.length; i++) {
		if (scores[i].name !== get(name)) continue;
		if (i + 1 === scores.length) {
			name.set(scores[0].name);
			composer.set(scores[0].composer);
			releaseTime.set(scores[0].releaseTime || DEFAULT_RELEASE_TIME);
			increment.set(scores[0].increment || 0);
		} else {
			name.set(scores[i + 1].name);
			composer.set(scores[i + 1].composer);
			releaseTime.set(scores[i + 1].releaseTime || DEFAULT_RELEASE_TIME);
			increment.set(scores[i + 1].increment || 0);
		}
		break;
	}
	isChanging.set(false);
};
export const toggleIsPlaying = () => isPlaying.update((v) => !v);
export const resetStates = () => {
	clearTimeouts();
	maxVelocity.set(1);
	duration.set(0);
	increment.set(0);
	isChanging.set(true);
	setTimeout(changeScore, 4000);
};
export const initializePlayerStates = () => {
	if (!get(name)) {
		name.set(scores[0].name);
		composer.set(scores[0].composer);
		releaseTime.set(scores[0].releaseTime || DEFAULT_RELEASE_TIME);
		increment.set(scores[0].increment || 0);
	}
};
