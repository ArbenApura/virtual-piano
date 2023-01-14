// IMPORTED TYPES
import type { Song } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';
// IMPORTED UTILS
import { playSong } from './utils';

// STATES
export const currentSong = writable<Song>();
export const isPlaying = writable<boolean>(false);
export const playerStates = { currentSong, isPlaying };

// SUBSCRIPTIONS
isPlaying.subscribe((isPlaying) => isPlaying && playSong());
