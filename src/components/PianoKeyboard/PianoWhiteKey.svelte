<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { isTouchScreen, resizeCount } from '$stores/mediaStates';

	// PROPS
	export let key: PianoKey, isSwiping: boolean;

	// REFS
	let keyEl: HTMLButtonElement;

	// STATES
	const { isPressing, boundaries } = noteList[key.note];
	const filler = {
		x: 0,
		width: 0,
		height: 0,
	};

	// REACTIVE STATEMENTS
	$: $resizeCount && handleUpdate();

	// UTILS
	const handleFiller = () => {
		try {
			const fillerEl = document.querySelector(`#${key.note}-filler`);
			if (!fillerEl) return;
			const { x, width, height } = fillerEl.getBoundingClientRect();
			filler.x = x;
			filler.width = width;
			filler.height = height * 1.5;
		} catch {}
	};
	const handleBoundary = () => {
		if (!keyEl) return;
		const { x, y, width, height } = keyEl.getBoundingClientRect();
		boundaries.update((boundaries) => {
			boundaries[0] = { x, y, width, height };
			return boundaries;
		});
	};
	const handleUpdate = () => {
		handleFiller();
		handleBoundary();
	};
	const handlePress = () => !isSwiping && isPressing.set(true);
	const handleRelease = () => !isSwiping && isPressing.set(false);

	// LIFECYCLES
	onMount(handleUpdate);
</script>

<button
	id="{key.note}-key"
	class="key"
	data-is-active={$isPressing}
	bind:this={keyEl}
	on:pointerdown={() => !$isTouchScreen && handlePress()}
	on:pointerup={() => !$isTouchScreen && handleRelease()}
	on:pointerout={() => !$isTouchScreen && handleRelease()}
	on:touchstart={() => $isTouchScreen && handlePress()}
	on:touchend={() => $isTouchScreen && handleRelease()}
>
	<div class="key-inner">
		<span class="flex-grow" />
		<span>{key.note}</span>
	</div>
	<div
		class="filler"
		style="left: {filler.x}px; width: {filler.width}px; height: {filler.height}px"
	/>
</button>

<style lang="scss">
	.key {
		@apply bg-slate-50  w-full h-full rounded-b-[.2vw] overflow-hidden border-x-[.1vw] border-b-[.1vw] border-gray-300;
		.key-inner {
			@apply h-full flex flex-col items-center;
			font-size: 0.7vw;
		}
		.filler {
			@apply absolute bottom-0;
		}
		&[data-is-active='true'] {
			@apply mt-[.2vw];
			.key-inner {
				box-shadow: inset 1vw 0 1vw -1vw rgba(0, 0, 0, 0.4);
			}
		}
	}
</style>
