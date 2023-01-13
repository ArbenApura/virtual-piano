<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';

	// PROPS
	export let type: string, note: string;

	// REFS
	let tileEl: HTMLDivElement;

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
		tile.y = y;
		tile.width = width;
		tile.height = height;
		return tile;
	})();
	$: isActive = (() => {
		// @ts-ignore
		return isPressed[note.replace('#', 'S')];
	})();

	// UTILS
	const handleResize = () => {
		tileEl = tileEl;
	};

	// LIFECYCLES
	onMount(() => {
		handleResize();
	});
</script>

<svelte:window on:resize={handleResize} />

<div class="tile {type}-tile" data-is-active={$isActive} bind:this={tileEl} />

<div
	class="highlight-tile {type}-tile"
	style="width: {tile.width}px; height: {tile.height}px; left: {tile.x}px; top: {tile.y}px"
	data-is-active={$isActive}
/>

<style lang="scss">
	@import '$styles';
	.tile {
		@apply relative;
		&.white-tile {
			@apply h-full opacity-50 mr-[.1vw] last:mr-0;
			width: calc((100vw - (35 * 0.1vw)) / 36);
		}
		&.black-tile {
			--tiles-width: 1.75vw;
			@apply p-[.1vw] pt-0 -z-10 mr-[.1vw] last:mr-0 opacity-0;
			width: var(--tiles-width);
			transform: translate(calc(var(--tiles-width) / 2), -0.15vw);
			margin-left: calc(((var(--tiles-width) / 1) / -1) - 0.1vw);
		}
		&[data-is-active='true'] {
			@apply opacity-100;
		}
	}
	.highlight-tile {
		@apply absolute opacity-0;
		&::before {
			@apply absolute w-full h-full opacity-75 z-20;
			content: '';
		}
		&::after {
			@apply absolute w-full h-full opacity-100 z-10;
			content: '';
			background-image: url('$assets/bg-1.png');
			background-attachment: fixed;
			background-size: cover;
			background-position: bottom;
		}
		&.white-tile {
			@apply z-10;
			&::before {
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
		}
		&.black-tile {
			@apply z-20 border-x-[.1vw] border-transparent;
			&::before {
				background-color: rgba(55, 65, 81, 0.4);
				background-image: linear-gradient(
					to top,
					transparent,
					rgba(55, 65, 81, 0.2),
					rgba(55, 65, 81, 0.4),
					rgba(55, 65, 81, 0.6),
					rgba(55, 65, 81, 0.8),
					rgba(55, 65, 81, 1)
				);
			}
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
