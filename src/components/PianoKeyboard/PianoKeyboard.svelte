<script lang="ts">
	// IMPORTED TYPES
	import type { Pointer } from './types';
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoKey from './PianoKey.svelte';

	// STATES
	let pointer: Pointer = {
		isDown: false,
		isSwiping: false,
		x: 0,
		y: 0,
	};

	// UTILS
	const updatePointer = (event: PointerEvent) => {
		if (!pointer.isDown) return;
		pointer.x = event.x;
		pointer.y = event.y;
	};
	const resetPointer = () => {
		pointer = {
			isDown: false,
			isSwiping: false,
			x: 0,
			y: 0,
		};
	};
</script>

<div
	class="keyboard"
	on:pointerup={resetPointer}
	on:pointerleave={resetPointer}
	on:pointerdown={(event) => {
		pointer.isDown = true;
		updatePointer(event);
	}}
	on:pointermove={(event) => {
		if (pointer.isDown) pointer.isSwiping = true;
		updatePointer(event);
	}}
>
	{#each pianoKeys as key}
		<PianoKey {...{ key, pointer }} />
	{/each}
</div>

<style lang="scss">
	@import '$styles';
	.keyboard {
		@apply relative aspect-[14/2] flex pt-[.6vw] border-t-[.2vw];
		&::before {
			@apply absolute top-[-.2vw] w-full h-full bg-gray-50 opacity-50 -z-10;
			content: '';
		}
	}
</style>
