<script lang="ts">
	// IMPORTED TYPES
	import type { NoteState } from '$stores/pianoStates';
	// IMPORTED UTILS
	import { maxVelocity } from '$stores/playerStates';
	import { visibility } from '$stores/settingsStates';

	// PROPS
	export let note: NoteState;

	// STORE STATES
	const { visualizerAnimation } = visibility;

	// STATES
	const { boundaries, isPressing, velocity } = note;
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
	data-is-animation-on={$visualizerAnimation}
	data-is-active={$isPressing}
	data-is-flipped={isFlipped}
>
	<span class="bar" />
	<span class="bar" />
	<span class="bar" />
</div>

<style lang="scss">
	.tile {
		@apply absolute flex items-center gap-[1px] opacity-50;
		.bar {
			@apply relative w-full min-h-[2px] h-0 flex items-center;
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
			.bar {
				@apply rounded-full;
			}
		}
		&[data-is-animation-on='true'] {
			transition: height 300ms;
			.bar {
				transition: 100ms ease;
			}
			&[data-is-active='true'] {
				transition: height 100ms;
			}
		}
	}
</style>
