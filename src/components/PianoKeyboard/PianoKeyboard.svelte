<script lang="ts">
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoKey from './PianoKey.svelte';

	// STATES
	let pointerIsDown = false;
</script>

<div
	class="keyboard"
	on:pointerdown={() => (pointerIsDown = true)}
	on:pointerup={() => (pointerIsDown = false)}
	on:pointerleave={() => (pointerIsDown = false)}
>
	{#each pianoKeys as key}
		<PianoKey {...{ key, pointerIsDown }} />
	{/each}
</div>

<style lang="scss">
	@import '$styles';
	.keyboard {
		@apply relative aspect-[14/2] flex pt-[.6vw] border-t-[.2vw];
		&::before {
			@apply absolute top-[-.2vw] w-full h-full bg-gray-50 opacity-50 -z-10;
			content: '';
		}
	}
</style>
