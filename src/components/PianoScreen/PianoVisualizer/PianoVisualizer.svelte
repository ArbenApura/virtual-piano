<script lang="ts">
	// IMPORTED UTILS
	import { visibility } from '$stores/settingStates';
	import { noteList } from '$stores/pianoStates';
	import { pianoNotes } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import VisualizerTile from './VisualizerTile.svelte';

	// STORE STATES
	const { visualizer } = visibility;
</script>

{#if $visualizer}
	<div class="visualizer">
		{#each pianoNotes as key}
			<VisualizerTile note={noteList[key]} />
		{/each}
	</div>
{/if}

<style lang="scss">
	.visualizer {
		@apply absolute top-[50%] w-full h-[15vw] translate-y-[-50%] flex items-center z-[60];
	}
</style>
