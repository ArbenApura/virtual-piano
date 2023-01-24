// IMPORTED UTILS
import { isFullScreen, isFullScreenSupported } from './states';

// UTILS
export const canGoFullscreen = () =>
	typeof document.body.requestFullscreen !== 'undefined' ||
	// @ts-ignore
	typeof document.body.mozRequestFullScreen !== 'undefined' ||
	// @ts-ignore
	typeof document.body.webkitRequestFullscreen !== 'undefined' ||
	// @ts-ignore
	typeof document.body.msRequestFullscreen !== 'undefined' ||
	// @ts-ignore
	typeof document.exitFullscreen !== 'undefined' ||
	// @ts-ignore
	typeof document.mozCancelFullScreen !== 'undefined' ||
	// @ts-ignore
	typeof document.webkitExitFullscreen !== 'undefined';
export const requestFullScreen = async () => {
	try {
		if (!!document.fullscreenElement) return;
		const requestFullScreen = (
			document.body.requestFullscreen ||
			// @ts-ignore
			document.body.mozRequestFullScreen ||
			// @ts-ignore
			document.body.webkitRequestFullscreen ||
			// @ts-ignore
			document.body.msRequestFullscreen ||
			(() => {})
		).bind(document.body);
		await requestFullScreen();
		await window.screen.orientation.lock('landscape');
	} catch {}
};
export const exitFullScreen = async () => {
	try {
		if (!document.fullscreenElement) return;
		const exitFullScreen = (
			document.exitFullscreen ||
			// @ts-ignore
			document.mozCancelFullScreen ||
			// @ts-ignore
			document.webkitExitFullscreen ||
			// @ts-ignore
			document.msExitFullscreen ||
			(() => {})
		).bind(document);
		await exitFullScreen();
		window.screen.orientation.unlock();
	} catch {}
};
export const toggleIsFullScreen = () => {
	if (document.fullscreenElement) exitFullScreen();
	else requestFullScreen();
};
export const observeFullScreen = () => isFullScreen.set(!!document.fullscreenElement);
export const initializeSettingStates = () => {
	observeFullScreen();
	isFullScreenSupported.set(canGoFullscreen());
};
