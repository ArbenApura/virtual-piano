<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { resizeCount } from '$stores/mediaStates';
	// IMPORTED COMPONENTS
	import Line from './Line.svelte';

	// REFS
	let el: SVGElement;

	// STATES
	let y = 0,
		height = 0;

	// REACTIVE STATEMENTS
	$: $resizeCount && handleBoundary();

	// UTILS
	const handleBoundary = () => {
		if (!el) return;
		const rect = el.getBoundingClientRect();
		height = rect.height;
		y = height / 2;
	};

	// LIFECYCLES
	onMount(handleBoundary);
</script>

<svg class="line-display" bind:this={el}>
	{#each Object.keys(noteList) as key, i}
		<Line {...{ key, y }} />
	{/each}
</svg>

<style lang="scss">
	.line-display {
		@apply absolute bottom-0 w-full h-[20%] z-[60];
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		stroke-width: 2px;
		stroke-linecap: round;
	}
</style>
