<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { isTouchScreen, resizeCount } from '$stores/mediaStates';
	import { visibility } from '$stores/settingStates';

	// PROPS
	export let key: PianoKey, isSwiping: boolean;

	// REFS
	let keyEl: HTMLButtonElement;

	// STATES
	const { isPressing, boundaries } = noteList[key.note];

	// REACTIVE STATEMENTS
	$: $resizeCount && handleBoundary();

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

<button id="{key.note}-key" class="key" data-is-active={$isPressing} bind:this={keyEl}>
	<div class="key-body {key.type}-key">
		<span class="bind">
			{#if $visibility.keyboardHint.bind}
				{key.bind}
				{#if key.type === 'black'}
					<i class="ti ti-plus" />
					<i class="ti ti-arrow-big-top" />
				{/if}
			{/if}
		</span>
		<span class="note">
			{#if $visibility.keyboardHint.note}
				{key.note.replace('S', '#')}
			{/if}
		</span>
	</div>
	<div class="key-bottom" />
	<div
		class="wrapper"
		on:pointerdown={() => !$isTouchScreen && handlePress()}
		on:pointerup={() => !$isTouchScreen && handleRelease()}
		on:pointerout={() => !$isTouchScreen && handleRelease()}
		on:touchstart={() => $isTouchScreen && handlePress()}
		on:touchend={() => $isTouchScreen && handleRelease()}
	/>
</button>

<style lang="scss">
	.key {
		@apply bg-[#111] relative w-full h-full -mt-[.3vw] rounded-t-[.2vw] rounded-b-none overflow-hidden flex flex-col border-x-[.1vw] border-b-[.1vw] border-[#222];
		height: calc(100% + 0.3vw);
		box-shadow: 0.6vw -0.1vw 0.6vw rgb(0, 0, 0, 0.3);
		.key-body {
			@apply w-full h-full flex flex-col flex-grow text-center rounded-b-[.5vw] mb-[.1vw];
			font-size: 0.5vw;
			background-image: linear-gradient(to bottom, #000, #000, #000, #222, #222);
			span {
				@apply py-[.2vw];
			}
			.bind {
				@apply flex flex-col flex-grow;
				.ti {
					@apply py-[.1vw];
				}
			}
			&.black-key {
				@apply text-slate-300 rounded-[.2vw] overflow-hidden;
			}
		}
		.key-bottom {
			@apply w-full h-[8%] rounded-t-[.2vw] bg-[#000];
		}
		.wrapper {
			@apply absolute w-full h-full;
		}
		&[data-is-active='true'] {
			@apply h-full mt-0;
			box-shadow: none;
			.key-bottom {
				@apply h-[0%];
			}
		}
	}
</style>
