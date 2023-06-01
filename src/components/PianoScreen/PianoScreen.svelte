<script lang="ts">
	// IMPORTED UTILS
	import { visibility } from '$stores/settingsStates';
	// IMPORTED COMPONENTS
	import PianoDetails from './PianoDetails.svelte';
	import PianoTiles from './PianoTiles/PianoTiles.svelte';
	import PianoVisualizer from './PianoVisualizer/PianoVisualizer.svelte';
	import PianoProgress from './PianoProgress.svelte';
	import PianoLines from './PianoLines.svelte';

	// STORE STATES
	const { lines, highlight, visualizer, progress, playerDetails } = visibility;
</script>

<div class="screen">
	{#if $playerDetails}
		<PianoDetails />
	{/if}
	{#if $highlight}
		<PianoTiles />
	{/if}
	{#if $visualizer}
		<PianoVisualizer />
	{/if}
	{#if $progress}
		<PianoProgress />
	{/if}
	{#if $lines}
		<PianoLines />
	{/if}
</div>

<style lang="scss">
	@import '$styles';
	.screen {
		@apply w-full h-full relative border-b-[1px] border-gray-900;
		&::before,
		&::after {
			@apply absolute top-0 w-full h-full;
			content: '';
		}
		&::before {
			@apply opacity-50 bg-gray-900;
		}
		&::after {
			@apply bg-gradient-to-t from-transparent to-gray-900 opacity-50 z-50;
		}
	}
</style>
