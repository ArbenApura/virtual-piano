<script lang="ts">
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { pianoNotes } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoTile from './PianoTile.svelte';
</script>

<div class="tiles">
	{#each pianoNotes as key}
		<PianoTile note={noteList[key]} />
	{/each}
</div>

<style lang="scss">
	.tiles {
		@apply relative w-full flex;
		height: calc(100%);
	}
</style>
