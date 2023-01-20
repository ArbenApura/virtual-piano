<script lang="ts">
	// IMPORTED LIB-TYPES
	import type { Sketch } from 'p5-svelte';
	// IMORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { resizeCount } from '$stores/mediaStates';
	// IMPORTED LIB-COMPONENTS
	import P5Container from 'p5-svelte';

	// REFS
	let el: HTMLDivElement;

	// STATES
	let width: number, height: number;

	// REACTIVE STATEMENTS
	$: $resizeCount && handleBoundary();

	// UTILS
	const handleBoundary = () => {
		if (!el) return;
		const rect = el.getBoundingClientRect();
		width = rect.width;
		height = rect.height;
	};
	const sketch: Sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height);
		};
		p5.draw = () => {
			p5.clear(0, 0, 0, 0);
		};
		p5.windowResized = () => {
			p5.resizeCanvas(width, height);
		};
	};

	// LIFECYCLES
	onMount(handleBoundary);
</script>

<div class="fx" bind:this={el}>
	<P5Container {sketch} />
</div>

<style lang="scss">
	.fx {
		@apply absolute top-0 w-full h-full z-[100];
	}
</style>
