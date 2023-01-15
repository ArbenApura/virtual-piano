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
	on:pointerdown={() => (isPointerDown = true)}
	on:pointerup={() => (isPointerDown = false)}
>
	{#each pianoKeys as key}
		<PianoKey {...{ key, isPointerDown }} />
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
