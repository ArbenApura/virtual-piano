<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { isTouchScreen, windowWidth } from '$stores/mediaStates';
	import { visibility } from '$stores/settingStates';

	// PROPS
	export let key: PianoKey, isSwiping: boolean;

	// REFS
	let keyEl: HTMLButtonElement;

	// STORE STATES
	const { keyboardBindHint, keyboardNoteHint } = visibility;

	// STATES
	const { isPressing, boundaries } = noteList[key.note];

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

<button id="{key.note}-key" class="key" data-is-active={$isPressing} bind:this={keyEl}>
	<div class="key-body {key.type}-key">
		<span class="bind">
			{#if $keyboardBindHint}
				{key.bind}
				{#if key.type === 'black'}
					<i class="ti ti-plus" />
					<i class="ti ti-arrow-big-top" />
				{/if}
			{/if}
		</span>
		<span class="note">
			{#if $keyboardNoteHint}
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
		@apply bg-[#222] relative w-full h-full -mt-[.3vw] rounded-t-[.2vw] rounded-b-none overflow-hidden flex flex-col border-x-[.1vw] border-b-[.1vw] border-[#222];
		height: calc(100% + 0.3vw);
		.key-body {
			@apply bg-[#000] w-full h-full flex flex-col flex-grow text-center rounded-b-[.5vw] mb-[.05vw];
			font-size: 0.5vw;
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
			@apply w-full h-[8%] rounded-t-[.2vw] bg-[#111];
		}
		.wrapper {
			@apply absolute w-full h-full;
		}
		&[data-is-active='true'] {
			@apply h-full mt-0;
			box-shadow: none;
			.key-body {
				@apply bg-[#111] mb-0;
			}
			.key-bottom {
				@apply h-[0%];
			}
		}
	}
</style>
