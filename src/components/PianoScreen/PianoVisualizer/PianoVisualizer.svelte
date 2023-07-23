<script lang="ts">
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { pianoNotes } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import VisualizerTile from './VisualizerTile.svelte';
</script>

<div class="visualizer">
	{#each pianoNotes as key}
		<VisualizerTile note={noteList[key]} />
	{/each}
</div>

<style lang="scss">
	.visualizer {
		@apply absolute top-[50%] w-full h-[18vw] translate-y-[-50%] flex items-center z-[1000];
	}
</style>
