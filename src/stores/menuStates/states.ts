// IMPORTED TYPES
import type { Tab } from './types';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';

// STATES
export const isOpen = writable<boolean>(false);
export const currentTab = writable<Tab>('none');
export const menuStates = { isOpen };
