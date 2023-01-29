// IMPORTED UTILS
import { isFullScreen, isFullScreenSupported, orientation, layout } from './states';

// UTILS
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
export const toggleLayout = () =>
	layout.update((val) => {
		switch (val) {
			case 0:
				return 1;
			case 1:
				return 2;
			default:
				return 0;
		}
	});
export const initializeSettingStates = () => {
	observeFullScreen();
	observeOrientation();
	isFullScreenSupported.set(canGoFullscreen());
};
