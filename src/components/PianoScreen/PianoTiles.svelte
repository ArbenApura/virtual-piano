<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { isPressed, time } from '$stores/pianoStates';

	// PROPS
	export let type: string, note: string;

	// REFS
	let tileEl: HTMLDivElement;

	// STATES
	let blackTileX = 0;
	let ripples: number[] = [];
	let count = 0;

	// REACTIVE STATES
	$: tile = (() => {
		const tile = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};
		if (!tileEl) return tile;
		const { x, y, width, height } = tileEl.getBoundingClientRect();
		tile.x = x;
		tile.y = y + height;
		tile.width = width;
		switch ($time) {
			case '2n':
				tile.height = height;
				break;
			case '4n':
				tile.height = height * 0.75;
				break;
			case '8n':
				tile.height = height * 0.5;
				break;
			case '16n':
				tile.height = height * 0.25;
				break;
			default:
				tile.height = height * 1.25;
		}
		return tile;
	})();
	$: isActive = (() => {
		// @ts-ignore
		return isPressed[note.replace('#', 'S')];
	})();
	$: if ($isActive) {
		ripples = [...ripples, count++];
		const id = ripples[ripples.length - 1];
		setTimeout(() => {
			ripples = ripples.filter((value) => value !== id);
		}, 2000);
	}

	// UTILS
	const handleResize = () => {
		if (tileEl) blackTileX = tileEl.getBoundingClientRect().x;
		tileEl = tileEl;
	};

	// LIFECYCLES
	onMount(() => {
		handleResize();
	});
</script>

<svelte:window on:resize={handleResize} />

{#each ripples as _}
	<div
		class="ripple {type}-ripple"
		style="width: {tile.width}px; height: {tile.height}px; left: {tile.x}px; top: {tile.y}px"
	/>
{/each}

<div class="tile {type}-tile" data-is-active={$isActive} bind:this={tileEl} />

{#if type === 'black' && tileEl}
	<div class="tile floating-tile" data-is-active={$isActive} style="left: {blackTileX}px" />
{/if}

<style lang="scss">
	@import '$styles';
	@keyframes ripple {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-200vh);
		}
	}
	.ripple {
		@apply absolute w-full h-full rounded-[.2vw];
		transform: translateY(100vh);
		animation: ripple 1s forwards ease;
		&.white-ripple {
			@apply z-10 opacity-50;
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
		&.black-ripple {
			@apply z-20 opacity-75;
			background-image: linear-gradient(
				to top,
				transparent,
				rgba(17, 24, 39, 0.2),
				rgba(17, 24, 39, 0.4),
				rgba(17, 24, 39, 0.6),
				rgba(17, 24, 39, 0.8),
				rgba(17, 24, 39, 1)
			);
		}
	}
	.tile {
		@apply mr-[.1vw] last:mr-0 bg-gray-900 relative;
		background-image: url('$assets/bg-5.png');
		background-attachment: fixed;
		background-size: cover;
		background-position: bottom;
		&[data-is-active='true'] {
			&.white-tile,
			&.floating-tile {
				@apply opacity-80;
			}
		}
	}
	.white-tile {
		@apply h-full opacity-50;
		width: calc((100vw - (35 * 0.1vw)) / 36);
	}
	.black-tile {
		--tiles-width: 1.75vw;
		@apply p-[.1vw] pt-0 -z-10 opacity-0;
		width: var(--tiles-width);
		transform: translate(calc(var(--tiles-width) / 2), -0.15vw);
		margin-left: calc(((var(--tiles-width) / 1) / -1) - 0.1vw);
	}
	.floating-tile {
		--tiles-width: 1.75vw;
		@apply bg-black h-full mr-0 absolute z-10 opacity-0 border-x-[.1vw] border-gray-800;
		width: var(--tiles-width);
	}
</style>
