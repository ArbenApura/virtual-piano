<script lang="ts">
	// IMPORTED TYPES
	import type { NoteState } from '$stores/pianoStates';
	// IMPORTED UTILS
	import { visibility } from '$stores/settingStates';

	// PROPS
	export let note: NoteState;

	// STORE STATES
	const { highlight } = visibility;

	// STATES
	const { isPressing, boundaries, type } = note;

	// REACTIVE STATES
	$: boundary = (type === 'white' ? $boundaries[1] : $boundaries[0]) || { x: 0, width: 0 };
</script>

{#if $highlight}
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
{/if}

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
			@apply opacity-75 z-20;
			background-color: rgba(255, 255, 255, 0.4);
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
			@apply opacity-100 z-10;
			background-image: var(--bg-image);
			background-attachment: fixed;
			background-size: cover;
			background-position: bottom;
		}
		&[data-is-active='true'] {
			@apply opacity-100;
			&::before {
				@apply bg-transparent;
				transition: background-color 0.5s;
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
