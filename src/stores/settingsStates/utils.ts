// IMPORTED UTILS
import { isAudioOnly, isFullScreen, isFullScreenSupported, orientation } from './states';

// UTILS
export const toggleIsAudioOnly = () => isAudioOnly.update((value) => !value);
export const canGoFullscreen = () => typeof document.body.requestFullscreen !== 'undefined';
export const requestFullscreen = async () => {
	try {
		if (!!document.fullscreenElement) return;
		await document.body.requestFullscreen();
		await window.screen.orientation.lock('landscape');
	} catch {}
};
export const exitFullscreen = async () => {
	try {
		if (!document.fullscreenElement) return;
		await document.exitFullscreen();
		window.screen.orientation.unlock();
	} catch {}
};
export const toggleIsFullScreen = () => {
	if (document.fullscreenElement) exitFullscreen();
	else requestFullscreen();
};
export const observeFullScreen = () => isFullScreen.set(!!document.fullscreenElement);
export const observeOrientation = () =>
	orientation.set(window.screen.orientation.type.match(/portrait/gi) ? 'portrait' : 'landscape');
export const initializeSettingStates = () => {
	observeFullScreen();
	observeOrientation();
	isFullScreenSupported.set(canGoFullscreen());
};
