<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { isTouchScreen, windowWidth } from '$stores/mediaStates';
	import { visibility } from '$stores/settingsStates';

	// PROPS
	export let key: PianoKey, isSwiping: boolean;

	// REFS
	let keyEl: HTMLButtonElement;

	// STORE STATES
	const { keyboardNoteHint } = visibility;
	const { isPressing, boundaries } = noteList[key.note];

	// REACTIVE STATES
	$: filler =
		$boundaries.length === 2
			? $boundaries[1]
			: {
					x: 0,
					width: 0,
					height: 0,
			  };

	// REACTIVE STATEMENTS
	$: $windowWidth && handleBoundary();

	// UTILS
	const handleBoundary = () => {
		if (!keyEl) return;
		const { x, y, width, height } = keyEl.getBoundingClientRect();
		boundaries.update((boundaries) => {
			boundaries[0] = { x, y, width, height };
			return boundaries;
		});
	};
	const handlePress = () => !isSwiping && isPressing.set(true);
	const handleRelease = () => !isSwiping && isPressing.set(false);

	// LIFECYCLES
	onMount(handleBoundary);
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
		{#if $keyboardNoteHint}
			<span>{key.note}</span>
		{/if}
	</div>
	<div
		class="filler"
		style="left: {filler.x}px; width: {filler.width}px; height: {filler.height}px"
	/>
</button>

<style lang="scss">
	.key {
		@apply bg-slate-50 w-full h-full rounded-b-[.2vw] overflow-hidden border-x-[.1vw] border-b-[.1vw] border-gray-300;
		.key-inner {
			@apply h-full flex flex-col items-center;
			font-size: 0.7vw;
		}
		.filler {
			@apply absolute top-[.5vw];
		}
		&[data-is-active='true'] {
			@apply bg-slate-200 mt-[.2vw];
		}
	}
</style>
