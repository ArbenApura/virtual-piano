<script lang="ts">
	// // IMPORTED LIB-TYPES
	// import type { Sketch } from 'p5-svelte';
	// // IMPORTED UTILS
	// import { gray } from '$utils/colors';
	// // IMPORTED LIB-COMPONENTS
	// import Canvas from 'p5-svelte';
	// IMPORTED COMPONENTS
	import PianoScreen from '$components/PianoScreen';
	import PianoKeyboard from '$components/PianoKeyboard';
	// IMPORTED SKETCHES
	// import Keyboard from '$sketches/Keyboard';

	// UTILS
	// const sketch: Sketch = (p5) => {
	// 	try {
	// 		// SKETCHES
	// 		const keyboard = new Keyboard(p5);

	// 		// EVENTS
	// 		p5.setup = () => {
	// 			p5.createCanvas(window.innerWidth, window.innerHeight);
	// 		};
	// 		p5.draw = () => {
	// 			p5.background(...gray[8]);
	// 			keyboard.draw();
	// 		};
	// 		p5.windowResized = () => {
	// 			p5.resizeCanvas(window.innerWidth, window.innerHeight);
	// 			keyboard.windowResized();
	// 		};
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
</script>

<!-- <Canvas {sketch} /> -->

<div class="page">
	<div class="piano-screen">
		<PianoScreen />
	</div>
	<PianoKeyboard />
</div>

<style lang="scss">
	@import '$styles';
	:global(canvas) {
		@apply absolute w-full h-full;
	}
	:root {
		--bg-image: url('$assets/images/bg-1.png');
	}
	.page {
		@apply absolute w-full h-full flex flex-col;
		.piano-screen {
			@apply flex-grow;
			background-image: var(--bg-image);
			background-attachment: fixed;
			background-size: cover;
			background-position: bottom;
		}
	}
</style>
