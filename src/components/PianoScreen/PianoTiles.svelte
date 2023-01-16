<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$utils/pianoKeys';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';
	import { visibility } from '$stores/settingStates';
	import { resizeCount } from '$stores/mediaStates';

	// PROPS
	export let pianoKey: PianoKey;
	const { note, type, bind } = pianoKey;

	// REFS
	let tileEl: HTMLDivElement;

	// REACTIVE STATES
	$: isActive = isPressed[note];
	$: $resizeCount && (tileEl = tileEl);
	$: tile = (() => {
		const tile = {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		};
		if (!tileEl) return tile;
		const { x, y, width, height } = tileEl.getBoundingClientRect();
		return { x, y, width, height };
	})();
</script>

<div class="tile {type}-tile" bind:this={tileEl} />

<div
	class="highlight-tile {type}-tile"
	style="width: {tile.width}px; height: {tile.height}px; left: {tile.x}px; top: {tile.y}px"
	data-is-active={$isActive}
/>

<div
	class="info-tile"
	style="width: {tile.width}px; height: {tile.height}px; left: {tile.x}px; top: {tile.y}px"
>
	{#if type === 'white'}
		{#if $visibility.screenHint.note}
			<small>{note}</small>
		{/if}
		{#if $visibility.screenHint.note && $visibility.screenHint.bind}
			<hr />
		{/if}
		{#if $visibility.screenHint.bind}
			<small>{bind}</small>
		{/if}
	{/if}
	{#if $visibility.screenHint.dot || $isActive}
		<span class="{type}-dot" data-is-active={$isActive} />
	{/if}
</div>

<style lang="scss">
	@import '$styles';
	.tile {
		@apply relative h-full;
		&.white-tile {
			width: calc(100vw / 35);
		}
		&.black-tile {
			--key-width: 1.75vw;
			width: var(--key-width);
			transform: translateX(calc(var(--key-width) / 2));
			margin-left: calc((var(--key-width) / -1));
		}
	}
	.info-tile {
		@apply absolute flex-col z-[100];
		@include flex-center;
		small,
		hr,
		span {
			@apply opacity-40;
		}
		small {
			@apply text-slate-50 text-[.7vw] text-center;
		}
		hr {
			@apply w-[30%] my-[.2vw];
		}
		span {
			@apply absolute bottom-[1vw] rounded-full;
			@include box(0.4vw);
			&.white-dot {
				@apply bg-slate-50;
			}
			&.black-dot {
				@apply bg-gray-500;
			}
			&[data-is-active='true'] {
				@apply opacity-100;
				&.black-dot {
					@apply bg-gray-900;
				}
			}
		}
	}
	.highlight-tile {
		@apply absolute opacity-0;
		&::before,
		&::after {
			@apply absolute w-full h-full opacity-0;
			content: '';
		}
		&::before {
			@apply opacity-75 z-20;
			background-color: rgba(255, 255, 255, 0.4);
			background-image: linear-gradient(
				to top,
				transparent,
				rgba(255, 255, 255, 0.2),
				rgba(255, 255, 255, 0.4),
				rgba(255, 255, 255, 0.6),
				rgba(255, 255, 255, 0.8),
				#f8fafc
			);
		}
		&::after {
			@apply opacity-100 z-10;
			background-image: var(--bg-image);
			background-attachment: fixed;
			background-size: cover;
			background-position: bottom;
		}
		&.white-tile {
			@apply z-10;
		}
		&.black-tile {
			@apply z-20;
		}
		&[data-is-active='true'] {
			@apply opacity-100;
			&::before {
				@apply bg-transparent;
				transition: background-color 0.5s;
			}
		}
	}
</style>
