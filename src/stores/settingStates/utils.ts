// IMPORTED UTILS
import { isFullScreen } from './states';

// UTILS
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
export const initializeSettingStates = () => {};
