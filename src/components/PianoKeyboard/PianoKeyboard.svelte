<script lang="ts">
	// IMPORTED LIB-UTILS
	import { swipe } from 'svelte-gestures';
	// IMPORTED UTILS
	import { pianoClusters } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoCluster from './PianoCluster.svelte';

	// STATES
	let isSwiping = false;
</script>

<div
	class="keyboard"
	use:swipe
	on:swipemove={() => (isSwiping = true)}
	on:swipeup={() => (isSwiping = false)}
>
	{#each pianoClusters as cluster}
		<PianoCluster {cluster} />
	{/each}
</div>

<style lang="scss">
	@import '$styles';
	.keyboard {
		@apply relative h-[14vw] pt-[.5vw] pb-[.3vw] border-t-[1px] border-[#160801] grid gap-[1px];
		grid-template-columns: 0.8fr 1fr 0.8fr 1fr 0.8fr 1fr 0.8fr 1fr 0.8fr 1fr calc(100vw / 35);
		background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
			url('$assets/images/bg-wood.png');
	}
</style>
