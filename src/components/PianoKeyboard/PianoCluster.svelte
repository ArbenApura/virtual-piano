<script lang="ts">
	// IMPORTED TYPES
	import type { PianoCluster } from '$stores/pianoStates';
	// IMPORTED COMPONENTS
	import PianoBlackKey from './PianoBlackKey.svelte';
	import PianoWhiteKey from './PianoWhiteKey.svelte';
	import PianoWhiteKeyFiller from './PianoWhiteKeyFiller.svelte';

	// PROPS
	export let cluster: PianoCluster;

	// REACTIVE STATES
	$: clusterType = (() => {
		switch (cluster.length) {
			case 5:
				return 'two-black';
			case 7:
				return 'three-black';
			default:
				return 'unknown';
		}
	})();
</script>

<div class="cluster {clusterType}-cluster">
	<div class="black-keys">
		{#each cluster as key}
			{#if key.type === 'black'}
				<PianoBlackKey {key} />
			{:else}
				<PianoWhiteKeyFiller {key} />
			{/if}
		{/each}
	</div>
	<div class="white-keys">
		{#each cluster as key}
			{#if key.type === 'white'}
				<PianoWhiteKey {key} />
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@import '$styles';
	.cluster {
		@apply grid gap-[1px] w-full;
		grid-template-rows: 0.65fr 0.35fr;
		.black-keys {
			@apply grid gap-[1px];
		}
		.white-keys {
			@apply grid gap-[1px];
		}
		&.two-black-cluster {
			.black-keys {
				@apply grid-cols-5;
			}
			.white-keys {
				@apply grid-cols-3;
			}
		}
		&.three-black-cluster {
			.black-keys {
				@apply grid-cols-7;
			}
			.white-keys {
				@apply grid-cols-4;
			}
		}
	}
</style>
