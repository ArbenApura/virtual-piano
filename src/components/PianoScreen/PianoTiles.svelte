<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';

	// PROPS
	export let type: string, note: string;

	// REFS
	let tileEl: HTMLDivElement;

	// STATES
	let blackTileX = 0;

	// REACTIVE STATES
	$: isActive = (() => {
		// @ts-ignore
		return isPressed[note.replace('#', 'S')];
	})();

	// UTILS
	const handleFloatingTile = () => {
		if (tileEl) blackTileX = tileEl.getBoundingClientRect().x;
	};

	// LIFECYCLES
	onMount(() => {
		handleFloatingTile();
	});
</script>

<svelte:window on:resize={handleFloatingTile} />

<div class={`tile ${type}-tile`} data-is-active={$isActive} bind:this={tileEl} />

{#if type === 'black' && tileEl}
	<div class="tile floating-tile" data-is-active={$isActive} style="left: {blackTileX}px" />
{/if}

<style lang="scss">
	@import '$styles';
	.tile {
		@apply mr-[.1vw] last:mr-0 bg-gray-900;
		background-image: url('$assets/bg-1.png');
		background-attachment: fixed;
		background-size: cover;
		background-position: bottom;
		&[data-is-active='true'] {
			&.white-tile,
			&.floating-tile {
				@apply opacity-100;
			}
		}
	}
	.white-tile {
		@apply h-full opacity-40;
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
