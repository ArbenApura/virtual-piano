<script lang="ts">
	// IMPORTED TYPES
	import type { Pointer } from './types';
	// IMPORTED LIB-UTILS
	import { swipe } from 'svelte-gestures';
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoKey from './PianoKey.svelte';

	// STATES
	let pointer: Pointer = {
		x: 0,
		y: 0,
	};
	let isSwiping = false;

	// UTILS
	const updatePointer = (x: number, y: number) => {
		if (!isSwiping) false;
		pointer.x = x;
		pointer.y = y;
	};
	const resetPointer = () => {
		pointer = {
			x: 0,
			y: 0,
		};
	};
</script>

<div
	class="keyboard"
	on:pointerup={resetPointer}
	on:pointerleave={resetPointer}
	on:pointerdown={(e) => updatePointer(e.x, e.y)}
	on:pointermove={(e) => updatePointer(e.x, e.y)}
	use:swipe
	on:swipemove={() => (isSwiping = true)}
	on:swipeup={() => (isSwiping = false)}
>
	{#each pianoKeys as key}
		<PianoKey {...{ key, pointer, isSwiping }} />
	{/each}
</div>

<style lang="scss">
	@import '$styles';
	.keyboard {
		@apply relative h-[14vw] flex pt-[1vw] border-t-[.2vw] border-[#160801];
		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
			url('$assets/images/bg-wood.png');
		&::before {
			@apply bg-slate-50 absolute top-[1.1vw] left-0 w-full z-0;
			content: '';
			height: calc(100% - 1.2vw);
		}
	}
</style>
