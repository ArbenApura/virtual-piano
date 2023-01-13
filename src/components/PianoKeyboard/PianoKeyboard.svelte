<script lang="ts">
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoKey from './PianoKey.svelte';

	// STATES
	let isPointerDown = false;
</script>

<div
	class="keyboard"
	on:mousedown={() => (isPointerDown = true)}
	on:mouseup={() => (isPointerDown = false)}
	on:touchstart={() => (isPointerDown = true)}
	on:touchend={() => (isPointerDown = false)}
>
	{#each pianoKeys as key}
		<PianoKey {...{ key, isPointerDown }} />
	{/each}
</div>

<style lang="scss">
	@import '$styles';
	.keyboard {
		@apply aspect-[14/2] flex;
	}
</style>
