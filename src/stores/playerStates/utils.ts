// IMPORTED LIB-UTILS
import { get } from 'svelte/store';
// IMPORTED UTILS
import { sleep } from '$utils/sleep';
import { isPressed } from '$stores/pianoStates';
import { playerStates } from './states';
// IMPORTED SONGS
import { flightOfTheBumblebee as FOTB } from '$songs/flightOfTheBumblebee';

// UTILS
export const initializePlayerStates = () => {};
export const togglePlaySong = () => playerStates.isPlaying.update((value) => !value);
export const playSong = async () => {
	for (let s_i = 0; s_i < FOTB.length; s_i++) {
		const isPlaying = get(playerStates.isPlaying);
		if (!isPlaying) return;
		console.log(`${s_i}/${FOTB.length}`);
		const s_item = FOTB[s_i];
		for (let n_i = 0; n_i < s_item.notes.length; n_i++) {
			const n_item = s_item.notes[n_i];
			console.log(n_item.note);
			isPressed[n_item.note].set(true);
			setTimeout(() => isPressed[n_item.note].set(false), n_item.duration || 100);
		}
		if (s_item.wait) await sleep(s_item.wait);
	}
	playerStates.isPlaying.set(false);
};
