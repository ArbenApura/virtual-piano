<script lang="ts">
	// IMPORTED TYPES
	import type { NoteState } from '$stores/pianoStates';
	// IMPORTED LIB-UTILS
	import { writable } from 'svelte/store';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { increment, maxVelocity } from '$stores/playerStates';
	import { pianoNotes } from '$utils/pianoKeys';

	// PROPS
	export let note: NoteState;
	const { note: key, boundaries, isPressing, velocity, duration: currDuration } = note;

	// STATES
	let type: string = note.type;
	let isFlipped = false;
	let duration = 0;
	let index = pianoNotes.indexOf(key);
	let {
		isPrevPressing,
		isNextPressing,
		prevVelocity,
		nextVelocity,
		prevDuration,
		nextDuration,
		prevType,
		nextType,
	} = (() => {
		let isPrevPressing = writable(false);
		let isNextPressing = writable(false);
		let prevVelocity = writable(0);
		let nextVelocity = writable(0);
		let prevDuration = writable(0);
		let nextDuration = writable(0);
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
			prevDuration = prevNote.duration;
			nextDuration = nextNote.duration;
			prevType = prevNote.type;
			nextType = nextNote.type;
		} finally {
			return {
				isPrevPressing,
				isNextPressing,
				prevVelocity,
				nextVelocity,
				prevDuration,
				nextDuration,
				prevType,
				nextType,
			};
		}
	})();

	// REACTIVE STATES
	$: boundary = (note.type === 'white' ? $boundaries[1] : $boundaries[0]) || { x: 0, width: 0 };
	$: height = (() => {
		if ($isPressing) return calculateHeight($velocity);
		else if ($isPrevPressing) return calculateHeight($prevVelocity);
		else if ($isNextPressing) return calculateHeight($nextVelocity);
		return 0;
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
	$: (() => {
		if ($isPressing) duration = $currDuration;
		else if ($isPrevPressing) duration = $prevDuration;
		else if ($isNextPressing) duration = $nextDuration;
	})();

	// UTILS
	const calculateHeight = (velocity: number) =>
		velocity * 100 + (100 - $maxVelocity * 100) + $increment + 30;
</script>

<div
	class="tile {type}-tile"
	style="width: {boundary.width}px; height: {height || 100}%; left: {boundary.x}px;"
	data-direction={$isPressing
		? 'center'
		: $isPrevPressing
		? 'prev'
		: $isNextPressing
		? 'next'
		: ''}
	data-is-flipped={isFlipped}
	data-is-active={$isPressing || $isPrevPressing || $isNextPressing}
	data-is-first={key === 'F1'}
	data-is-last={key === 'B7'}
	data-is-short={duration <= 300}
>
	<span class="bar" />
	<span class="bar" />
	<span class="bar" />
</div>

<style lang="scss">
	.tile {
		$transition: calc(500ms * var(--speed));
		@apply absolute flex items-center gap-[1px] opacity-50 overflow-hidden max-h-[50vh];
		transition: height $transition ease;
		.bar {
			@apply bg-fixed w-full min-h-[2px] h-0 flex items-center rounded-[4px];
			transition: height $transition ease;
			background-image: var(--bar-bg-image);
			background-size: var(--bar-bg-size);
			background-position-x: var(--bar-bg-position-x);
			background-position-y: var(--bar-bg-position-y);
			filter: var(--bar-filter);
		}
		&[data-is-first='true'] .bar {
			&:nth-child(1) {
				@apply min-h-[14px];
			}
			&:nth-child(2) {
				@apply min-h-[8px];
			}
			&:nth-child(3) {
				@apply min-h-[4px];
			}
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
			--duration: calc(var(--bar-active-duration) * var(--speed));
			&[data-is-short='true'] {
				--duration: 50ms;
			}
			&[data-direction='center'] {
				@apply opacity-100;
			}
			transition: height var(--duration) ease-out;
			.bar {
				transition: height var(--duration) ease-out;
			}
		}
	}
</style>
