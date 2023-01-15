// TYPES
export type KeyboardHintVisibility = {
	note: boolean;
	bind: boolean;
};
export type ScreenHintVisibility = KeyboardHintVisibility & {
	dot: boolean;
};
export type Visibility = {
	keyboardHint: KeyboardHintVisibility;
	screenHint: ScreenHintVisibility;
};
