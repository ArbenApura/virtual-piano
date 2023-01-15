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
		@apply relative h-[14vw] flex pt-[1vw] border-t-[.2vw] border-[#160801];
		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
			url('$assets/bg-wood.png');
		&::before {
			@apply bg-slate-50 absolute top-[1.1vw] w-full h-full z-0;
			content: '';
			height: calc(100% - 1.2vw);
		}
	}
</style>
