<script lang="ts">
	// IMPORTED TYPES
	import type { NoteState } from '$stores/pianoStates';

	// PROPS
	export let note: NoteState;

	// STATES
	const { isPressing, boundaries, type } = note;

	// REACTIVE STATES
	$: boundary = (type === 'white' ? $boundaries[1] : $boundaries[0]) || { x: 0, width: 0 };
</script>

<div
	class="highlight-tile {type}-tile"
	style="width: {boundary.width}px; left: {boundary.x}px"
	data-is-active={$isPressing}
/>
<div
	class="dot-tile"
	style="width: {boundary.width}px; left: {boundary.x}px"
	data-is-active={$isPressing}
>
	<span class="dot {type}-dot" />
	<span class="dot {type}-dot" />
</div>

<style lang="scss">
	.dot-tile,
	.highlight-tile {
		@apply absolute top-0 h-full opacity-0;
	}
	.highlight-tile {
		&::before,
		&::after {
			@apply absolute w-full h-full opacity-0;
			content: '';
		}
		&::before {
			@apply bg-slate-50 bg-opacity-40 opacity-75 z-20;
			background-image: linear-gradient(
				to top,
				transparent,
				rgba(255, 255, 255, 0.2),
				rgba(255, 255, 255, 0.4),
				rgba(255, 255, 255, 0.6),
				rgba(255, 255, 255, 0.8),
				#f8fafc
			);
		}
		&::after {
			@apply bg-fixed bg-cover opacity-100 z-10;
			background-image: var(--bg-image);
			background-position: var(--bg-position);
			background-position-x: var(--bg-position-x);
		}
		&[data-is-active='true'] {
			@apply opacity-100;
			&::before {
				@apply bg-transparent;
				transition: background-color 1.5s;
			}
		}
	}
	.dot-tile {
		@apply flex flex-col justify-between items-center py-[.4vw] z-[60];
		.dot {
			@apply w-[.8vw] h-[.4vw] rounded-full;
			&.white-dot {
				@apply bg-slate-50;
			}
			&.black-dot {
				@apply bg-[#000];
			}
		}
		&[data-is-active='true'] {
			@apply opacity-100;
		}
	}
</style>
