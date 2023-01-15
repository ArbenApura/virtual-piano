// IMPORTED UTILS
import { breakpoints } from '$utils/breakpoints';
// IMPORTED STATES
import { mediaStates, isMobile, isTouchScreen } from './states';

// UTILS
export const updateMedia = () => {
	const winWidth = window.innerWidth;

	mediaStates.isXS.set(winWidth < breakpoints.sm);
	mediaStates.isSM.set(winWidth >= breakpoints.sm && winWidth < breakpoints.md);
	mediaStates.isMD.set(winWidth >= breakpoints.md && winWidth < breakpoints.lg);
	mediaStates.isLG.set(winWidth >= breakpoints.lg && winWidth < breakpoints.xl);
	mediaStates.isXL.set(winWidth >= breakpoints.xl && winWidth < breakpoints['2xl']);
	mediaStates.is2XL.set(winWidth >= breakpoints['2xl']);

	mediaStates.isSMDown.set(winWidth < breakpoints.md);
	mediaStates.isMDDown.set(winWidth < breakpoints.lg);
	mediaStates.isLGDown.set(winWidth < breakpoints.xl);
	mediaStates.isXLDown.set(winWidth < breakpoints['2xl']);

	mediaStates.isXSUp.set(winWidth > breakpoints.sm);
	mediaStates.isSMUp.set(winWidth > breakpoints.md);
	mediaStates.isMDUp.set(winWidth > breakpoints.lg);
	mediaStates.isLGUp.set(winWidth > breakpoints.xl);
	mediaStates.isXLUp.set(winWidth > breakpoints['2xl']);

	detectMobile();
	detectTouchScreen();
};
export const detectMobile = () => {
	if (!navigator) return;
	if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/gi))
		isMobile.set(true);
	else isMobile.set(false);
};
export const detectTouchScreen = () => {
	if (window.matchMedia('(pointer: coarse)').matches) isTouchScreen.set(true);
	else isTouchScreen.set(false);
};
export const initializeMediaStates = () => {
	try {
		updateMedia();
	} catch (error) {
		console.error(error);
	}
};
