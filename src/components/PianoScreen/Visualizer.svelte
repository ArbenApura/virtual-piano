<script lang="ts">
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { pianoNotes } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import VisualizerGroup from './VisualizerGroup.svelte';
</script>

<div class="visualizer">
	{#each pianoNotes as note}
		<VisualizerGroup note={noteList[note]} />
	{/each}
</div>

<style lang="scss">
	.visualizer {
		@apply absolute top-[50%] w-full h-[40%] translate-y-[-50%] z-[100];
	}
</style>
