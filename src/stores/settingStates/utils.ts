// IMPORTED UTILS
import { isFullScreen } from './states';

// UTILS
export const toggleFullScreen = () => isFullScreen.update((v) => !v);
export const initializeSettingStates = () => {};
