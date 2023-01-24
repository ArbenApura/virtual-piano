<script lang="ts">
	// IMPORTED COMPONENTS
	import PianoDisplay from './PianoDisplay.svelte';
	import PianoTiles from './PianoTiles/PianoTiles.svelte';
	import PianoVisualizer from './PianoVisualizer/PianoVisualizer.svelte';
	import PianoLines from './PianoLines.svelte';
</script>

<div class="screen">
	<PianoDisplay />
	<PianoTiles />
	<PianoVisualizer />
	<PianoLines />
</div>

<style lang="scss">
	@import '$styles';
	.screen {
		@apply w-full h-full relative border-b-[1px] border-gray-900;
		&::before,
		&::after {
			@apply absolute top-0 w-full;
			content: '';
			height: calc(100%);
		}
		&::before {
			@apply opacity-50 bg-gray-900;
		}
		&::after {
			@apply bg-gradient-to-t from-transparent to-gray-900 opacity-80 z-50;
		}
	}
</style>
