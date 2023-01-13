<script lang="ts">
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoKey from './PianoKey.svelte';

	// STATES
	let isMouseDown = false;
</script>

<div
	class="keyboard"
	on:mousedown={() => (isMouseDown = true)}
	on:mouseup={() => (isMouseDown = false)}
>
	{#each pianoKeys as key}
		<PianoKey {...{ key, isMouseDown }} />
	{/each}
</div>

<style lang="scss">
	@import '$styles';
	.keyboard {
		@apply aspect-[14/2] flex;
	}
</style>
