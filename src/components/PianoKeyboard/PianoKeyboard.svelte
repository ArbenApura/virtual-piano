<script lang="ts">
	// IMPORTED TYPES
	import type { Note } from '$stores/pianoStates';
	// IMPORTED LIB-UTILS
	import { get } from 'svelte/store';
	import { swipe } from 'svelte-gestures';
	// IMPORTED UTILS
	import { pianoClusters } from '$utils/pianoKeys';
	import { noteList } from '$stores/pianoStates';
	// IMPORTED COMPONENTS
	import PianoCluster from './PianoCluster.svelte';

	// STATES
	let isSwiping = false;

	// UTILS
	const detectBoundaries = async (x: number, y: number) => {
		Object.keys(noteList).map((key) => {
			const note = noteList[key as Note];
			const boundaries = get(note.boundaries);
			if (note.type === 'white') {
				note.isPressing.set(
					(x > boundaries[0].x &&
						x < boundaries[0].x + boundaries[0].width &&
						y > boundaries[1].y) ||
						(x > boundaries[1].x &&
							x < boundaries[1].x + boundaries[1].width &&
							y > boundaries[1].y),
				);
			} else {
				note.isPressing.set(
					x > boundaries[0].x &&
						x < boundaries[0].x + boundaries[0].width &&
						y > boundaries[0].y &&
						y < boundaries[0].y + boundaries[0].height,
				);
			}
		});
	};
	const releaseAll = () => {
		Object.keys(noteList).map((key) => {
			const { isPressing } = noteList[key as Note];
			isPressing.set(false);
		});
	};
</script>

<div
	class="keyboard"
	use:swipe
	on:swipeup={() => (isSwiping = false)}
	on:swipemove={() => (isSwiping = true)}
	on:swipeup={releaseAll}
	on:swipemove={({ detail: { event } }) => detectBoundaries(event.x, event.y)}
>
	{#each pianoClusters as cluster}
		<PianoCluster {cluster} {isSwiping} />
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
