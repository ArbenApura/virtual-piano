<script lang="ts">
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoTiles from './PianoTiles.svelte';
</script>

<div class="screen">
	{#each pianoKeys as key}
		<PianoTiles type={key.type} note={key.note} />
	{/each}
</div>

<style lang="scss">
	@import '$styles';
	.screen {
		@apply w-full h-full flex relative;
	}
</style>
