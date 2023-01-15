// TYPES
export type KeyboardHintVisibility = {
	note: boolean;
	bind: boolean;
};
export type ScreenHintVisibility = KeyboardHintVisibility;
export type Visibility = {
	keyboardHint: KeyboardHintVisibility;
	screenHint: ScreenHintVisibility;
};
