// IMPORTED LIB-UTILS
import { get } from 'svelte/store';
// IMPORTED UTILS
import { sleep } from '$utils/sleep';
import { isPressed } from '$stores/pianoStates';
import { playerStates } from './states';
// IMPORTED SONGS
import song from '$songs/RushE';

// UTILS
export const initializePlayerStates = () => {};
export const togglePlaySong = () => playerStates.isPlaying.update((value) => !value);
export const calculateInterval = (interval: number, value: number) =>
	value >= 0 ? interval * value : interval / value;
export const increaseInterval = (interval: number, value: number) => interval - interval * value;
export const playSong = async () => {
	await sleep(1000);
	const { items } = song;
	let interval = song.interval;
	for (let i = 0; i < items.length; i++) {
		const isPlaying = get(playerStates.isPlaying);
		if (!isPlaying) return;
		const item = items[i];
		if (typeof item === 'number') {
			await sleep(calculateInterval(interval, item));
			continue;
		} else if (typeof item === 'function') {
			interval = item(song.interval);
			continue;
		}
		for (let n_i = 0; n_i < item[0].length; n_i++) {
			const n_item = item[0][n_i];
			const note = typeof n_item === 'string' ? n_item : n_item[0];
			isPressed[note].set(true);
			setTimeout(
				() => isPressed[note].set(false),
				typeof n_item === 'string'
					? 100
					: typeof n_item[1] === 'number'
					? calculateInterval(interval, n_item[1])
					: 100,
			);
		}
		if (item[1]) await sleep(calculateInterval(interval, item[1]));
		else await sleep(interval);
	}
	playerStates.isPlaying.set(false);
};
