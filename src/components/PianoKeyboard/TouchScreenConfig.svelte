<script lang="ts">
	// IMPORTED TYPES
	import type { Pointer } from './types';
	// IMPORTED UTILS
	import { isTouchScreen } from '$stores/mediaStates';

	// PROPS
	export let keyEl: HTMLButtonElement,
		pointer: Pointer,
		handleRelease: () => void,
		handlePress: () => void;

	// REACTIVE STATEMENTS
	$: (() => {
		if (!$isTouchScreen) return;
		if (!pointer.isSwiping || !pointer.isDown || !keyEl) return handleRelease();
		const { x, y, width, height } = keyEl.getBoundingClientRect();
		if (pointer.x > x && pointer.x < x + width && pointer.y > y && pointer.y < y + height)
			handlePress();
		else handleRelease();
	})();
</script>
