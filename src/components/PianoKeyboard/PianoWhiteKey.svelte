<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';
	import { isTouchScreen, resizeCount } from '$stores/mediaStates';

	// PROPS
	export let key: PianoKey;

	// STATES
	let filler = {
		x: 0,
		width: 0,
		height: 0,
	};

	// REACTIVE STATES
	$: isActive = isPressed[key.note];

	// REACTIVE STATEMENTS
	$: try {
		$resizeCount;
		handleFiller();
	} catch {}

	// UTILS
	const handleFiller = () => {
		const fillerEl = document.querySelector(`#${key.note}-filler`);
		if (!fillerEl) return;
		const { x, width, height } = fillerEl.getBoundingClientRect();
		filler.x = x;
		filler.width = width;
		filler.height = height * 1.5;
	};
	const handlePress = () => isPressed[key.note].set(true);
	const handleRelease = () => isPressed[key.note].set(false);

	// LIFECYCLES
	onMount(handleFiller);
</script>

<button
	id="{key.note}-key"
	class="key"
	data-is-active={$isActive}
	on:pointerdown={() => !$isTouchScreen && handlePress()}
	on:pointerup={() => !$isTouchScreen && handleRelease()}
	on:pointerout={() => !$isTouchScreen && handleRelease()}
	on:touchstart={() => $isTouchScreen && handlePress()}
	on:touchend={() => $isTouchScreen && handleRelease()}
>
	<span class="flex-grow" />
	<span>{key.note}</span>
	<div
		class="filler"
		style="left: {filler.x}px; width: {filler.width}px; height: {filler.height}px"
	/>
</button>

<style lang="scss">
	.key {
		@apply bg-slate-50 w-full h-full rounded-b-[.2vw] overflow-hidden flex flex-col items-center border-x-[.1vw] border-b-[.1vw] border-slate-300;
		font-size: 0.7vw;
		.filler {
			@apply absolute bottom-0;
		}
		&[data-is-active='true'] {
			@apply mt-[.2vw];
		}
	}
</style>
