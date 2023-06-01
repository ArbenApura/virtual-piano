<script lang="ts">
	// IMPORTED TYPES
	import type { NoteState } from '$stores/pianoStates';
	// IMPORTED UTILS
	import { maxVelocity } from '$stores/playerStates';

	// PROPS
	export let note: NoteState;
	const { boundaries, isPressing, velocity } = note;

	// STATES
	let isFlipped = false;

	// REACTIVE STATES
	$: boundary = (note.type === 'white' ? $boundaries[1] : $boundaries[0]) || { x: 0, width: 0 };
	$: height = $isPressing ? $velocity * 100 + (100 - $maxVelocity * 100) : 0;

	// REACTIVE STATEMENTS
	$: $isPressing && (isFlipped = !isFlipped);
</script>

<div
	class="tile {note.type}-tile"
	style="width: {boundary.width}px; height: {height}%; left: {boundary.x}px;"
	data-is-active={$isPressing}
	data-is-flipped={isFlipped}
>
	<span class="bar" />
	<span class="bar" />
	<span class="bar" />
</div>

<style lang="scss">
	.tile {
		@apply absolute flex items-center gap-[1px] opacity-40;
		transition: height 600ms;
		.bar {
			@apply relative w-full min-h-[2px] h-0 flex items-center rounded-[.4vw];
			transition: 200ms ease;
		}
		&.white-tile .bar {
			@apply bg-slate-50;
		}
		&.black-tile .bar {
			@apply bg-[#000];
		}
		&[data-is-flipped='true'] .bar {
			&:nth-child(1) {
				@apply h-[20%];
			}
			&:nth-child(2) {
				@apply h-[60%];
			}
			&:nth-child(3) {
				@apply h-[100%];
			}
		}
		&[data-is-flipped='false'] .bar {
			&:nth-child(1) {
				@apply h-[100%];
			}
			&:nth-child(2) {
				@apply h-[60%];
			}
			&:nth-child(3) {
				@apply h-[20%];
			}
		}
		&[data-is-active='true'] {
			@apply opacity-100;
			transition: height 200ms;
		}
	}
</style>
