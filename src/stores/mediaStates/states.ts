// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';
import { updateMedia } from './utils';

// STATES
export const windowWidth = writable<number>(0);
export const isMobile = writable<boolean>(false);
export const isTouchScreen = writable<boolean>(false);
export const isXS = writable<boolean>(false);
export const isSM = writable<boolean>(false);
export const isMD = writable<boolean>(false);
export const isLG = writable<boolean>(false);
export const isXL = writable<boolean>(false);
export const is2XL = writable<boolean>(false);
export const isSMDown = writable<boolean>(false);
export const isMDDown = writable<boolean>(false);
export const isLGDown = writable<boolean>(false);
export const isXLDown = writable<boolean>(false);
export const isXSUp = writable<boolean>(false);
export const isSMUp = writable<boolean>(false);
export const isMDUp = writable<boolean>(false);
export const isLGUp = writable<boolean>(false);
export const isXLUp = writable<boolean>(false);
export const mediaStates = {
	windowWidth,
	isMobile,
	isTouchScreen,
	isXS,
	isSM,
	isMD,
	isLG,
	isXL,
	is2XL,
	isSMDown,
	isMDDown,
	isLGDown,
	isXLDown,
	isXSUp,
	isSMUp,
	isMDUp,
	isLGUp,
	isXLUp,
};

// SUBSCRIPTIONS
windowWidth.subscribe(updateMedia);
