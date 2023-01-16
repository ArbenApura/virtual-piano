<script lang="ts">
	// IMPORTED TYPES
	import type { Pointer } from './types';
	// IMPORTED UTILS
	import { isTouchScreen } from '$stores/mediaStates';

	// PROPS
	export let keyEl: HTMLButtonElement,
		pointer: Pointer,
		isSwiping: boolean,
		handleRelease: () => void,
		handlePress: () => void;

	// REACTIVE STATEMENTS
	$: (() => {
		if (!isSwiping || !$isTouchScreen || !keyEl) return;
		const { x, y, width, height } = keyEl.getBoundingClientRect();
		if (pointer.x > x && pointer.x < x + width && pointer.y > y && pointer.y < y + height)
			handlePress();
		else handleRelease();
	})();
</script>
