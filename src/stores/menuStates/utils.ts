// IMPORTED UTILS
import { isOpen, currentTab } from './states';

// UTILS
export const openSettings = () => {
	currentTab.set('settings');
	isOpen.set(true);
};
export const openScores = () => {
	currentTab.set('scores');
	isOpen.set(true);
};
export const openAbout = () => {
	currentTab.set('about');
	isOpen.set(true);
};
export const closeMenu = () => {
	isOpen.set(false);
	currentTab.set('none');
};
