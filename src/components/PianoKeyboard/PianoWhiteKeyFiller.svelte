<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { resizeCount } from '$stores/mediaStates';

	// PROPS
	export let key: PianoKey;

	// REFS
	let keyEl: HTMLDivElement;

	// STATES
	const { isPressing, boundaries } = noteList[key.note];

	// REACTIVE STATEMENTS
	$: $resizeCount && handleBoundary();

	// UTILS
	const handleBoundary = () => {
		if (!keyEl) return;
		const { x, y, width, height } = keyEl.getBoundingClientRect();
		boundaries.update((boundaries) => {
			boundaries[1] = { x, y, width, height };
			return boundaries;
		});
	};

	// LIFECYCLES
	onMount(handleBoundary);
</script>

<div id="{key.note}-filler" class="filler" data-is-active={$isPressing} bind:this={keyEl}>
	<div class="filler-inner">
		<span>{key.bind}</span>
	</div>
</div>

<style lang="scss">
	.filler {
		.filler-inner {
			@apply bg-slate-50 w-full h-full rounded-t-[.2vw] overflow-hidden border-x-[.1vw] border-gray-300 pt-[.2vw] text-center;
			height: calc(100% + 0.3vw);
			font-size: 0.5vw;
		}
		&[data-is-active='true'] {
			@apply pt-[.3vw];
			.filler-inner {
				height: calc(100% + 0.4vw);
				box-shadow: inset 1vw 0 1vw -1vw rgba(0, 0, 0, 0.4);
			}
		}
	}
</style>
