<script lang="ts">
	// IMPORTED TYPES
	import type { NoteState } from '$stores/pianoStates';
	// IMPORTED LIB-UTILS
	import { writable } from 'svelte/store';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { maxVelocity } from '$stores/playerStates';
	import { pianoNotes } from '$utils/pianoKeys';

	// PROPS
	export let note: NoteState;
	const { note: key, boundaries, isPressing, velocity } = note;

	// STATES
	let type: string = note.type;
	let isFlipped = false;
	let index = pianoNotes.indexOf(key);
	let { isPrevPressing, isNextPressing, prevVelocity, nextVelocity, prevType, nextType } =
		(() => {
			let isPrevPressing = writable(false);
			let isNextPressing = writable(false);
			let prevVelocity = writable(0);
			let nextVelocity = writable(0);
			let prevType = 'white';
			let nextType = 'white';
			try {
				if (index < 0) throw new Error();
				const prevKey = pianoNotes[index + 1];
				const nextKey = pianoNotes[index - 1];
				const prevNote = noteList[prevKey];
				const nextNote = noteList[nextKey];
				if (!prevNote || !nextNote) throw new Error();
				isPrevPressing = prevNote.isPressing;
				isNextPressing = nextNote.isPressing;
				prevVelocity = prevNote.velocity;
				nextVelocity = nextNote.velocity;
				prevType = prevNote.type;
				nextType = nextNote.type;
			} finally {
				return {
					isPrevPressing,
					isNextPressing,
					prevVelocity,
					nextVelocity,
					prevType,
					nextType,
				};
			}
		})();

	// REACTIVE STATES
	$: boundary = (note.type === 'white' ? $boundaries[1] : $boundaries[0]) || { x: 0, width: 0 };
	$: height = (() => {
		if ($isPressing) return $velocity * 100 + (100 - $maxVelocity * 100);
		else if ($isPrevPressing) return $prevVelocity * 100 + (100 - $maxVelocity * 100);
		else if ($isNextPressing) return $nextVelocity * 100 + (100 - $maxVelocity * 100);
		else 0;
	})();

	// REACTIVE STATEMENTS
	$: $isPressing && (isFlipped = !isFlipped);
	$: (() =>
		(type = $isPressing
			? note.type
			: $isPrevPressing
			? prevType
			: $isNextPressing
			? nextType
			: type))();
</script>

<div
	class="tile {type}-tile"
	style="width: {key === 'C7'
		? boundary.width / 2
		: boundary.width}px; height: {height}%; left: {boundary.x}px;"
	data-direction={$isPressing
		? 'center'
		: $isPrevPressing
		? 'prev'
		: $isNextPressing
		? 'next'
		: ''}
	data-is-last={key === 'C7'}
	data-is-flipped={isFlipped}
	data-is-active={$isPressing || $isPrevPressing || $isNextPressing}
>
	<span class="bar" />
	<span class="bar" />
	<span class="bar" />
</div>

<style lang="scss">
	.tile {
		$transition: calc(500ms * var(--speed));
		@apply absolute flex items-center gap-[1px] opacity-40 overflow-hidden;
		transition: height $transition ease;
		.bar {
			@apply bg-fixed w-full min-h-[2px] h-0 flex items-center rounded-[4px];
			transition: height $transition ease;
			background-image: var(--bar-bg-image);
			background-size: var(--bar-bg-size);
			filter: var(--bar-filter);
		}
		&[data-is-last='true'] .bar {
			&:nth-child(1) {
				@apply min-h-[4px];
			}
			&:nth-child(2) {
				@apply min-h-[8px];
			}
			&:nth-child(3) {
				@apply min-h-[14px];
			}
		}
		&[data-direction='center'] {
			&[data-is-flipped='false'] {
				.bar {
					&:nth-child(1) {
						@apply h-[45%];
					}
					&:nth-child(2) {
						@apply h-[100%];
					}
					&:nth-child(3) {
						@apply h-[65%];
					}
				}
			}
			&[data-is-flipped='true'] {
				.bar {
					&:nth-child(1) {
						@apply h-[65%];
					}
					&:nth-child(2) {
						@apply h-[100%];
					}
					&:nth-child(3) {
						@apply h-[45%];
					}
				}
			}
		}
		&[data-direction='prev'] .bar {
			&:nth-child(1) {
				@apply h-[5%];
			}
			&:nth-child(2) {
				@apply h-[12%];
			}
			&:nth-child(3) {
				@apply h-[25%];
			}
		}
		&[data-direction='next'] .bar {
			&:nth-child(1) {
				@apply h-[25%];
			}
			&:nth-child(2) {
				@apply h-[12%];
			}
			&:nth-child(3) {
				@apply h-[5%];
			}
		}
		&[data-is-active='true'] {
			$duration: calc(100ms * var(--speed));
			&[data-direction='center'] {
				@apply opacity-100;
			}
			transition: height $duration;
			.bar {
				transition: height $duration;
			}
		}
	}
</style>
