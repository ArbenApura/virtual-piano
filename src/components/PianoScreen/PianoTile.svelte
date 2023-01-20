<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';
	import { visibility } from '$stores/settingStates';

	// PROPS
	export let pianoKey: PianoKey;
	const { note, type, bind } = pianoKey;

	// STATES
	const { isPressing, boundaries } = noteList[note];

	// REACTIVE STATES
	$: [x, width] = (() => {
		if (!$boundaries.length) return [0, 0];
		const { x, width } = $boundaries[0];
		return [x, width];
	})();
</script>

<div
	class="highlight-tile {type}-tile"
	style="width: {width}px; left: {x}px"
	data-is-active={$isPressing}
/>

<div class="info-tile" style="width: {width}px; left: {x}px;">
	{#if type === 'white'}
		{#if $visibility.screenHint.note}
			<small>{note}</small>
		{/if}
		{#if $visibility.screenHint.note && $visibility.screenHint.bind}
			<hr />
		{/if}
		{#if $visibility.screenHint.bind}
			<small>{bind}</small>
		{/if}
	{/if}
	{#if $visibility.screenHint.dot || $isPressing}
		<span class="{type}-dot" data-is-active={$isPressing} />
	{/if}
</div>

<style lang="scss">
	@import '$styles';
	.highlight-tile,
	.info-tile {
		@apply absolute top-0 h-full;
	}
	.info-tile {
		@apply flex-col z-[100];
		@include flex-center;
		small,
		hr,
		span {
			@apply opacity-40;
		}
		small {
			@apply text-slate-50 text-[.7vw] text-center;
		}
		hr {
			@apply w-[30%] my-[.2vw];
		}
		span {
			@apply absolute bottom-[1vw] w-[.4vw] h-[.8vw] rounded-full;
			&.white-dot {
				@apply bg-slate-50;
			}
			&.black-dot {
				@apply bg-gray-500;
			}
			&[data-is-active='true'] {
				@apply opacity-100;
				&.black-dot {
					@apply bg-[#000];
				}
			}
		}
	}
	.highlight-tile {
		@apply opacity-0;
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
		&.white-tile {
			@apply z-10;
		}
		&.black-tile {
			@apply z-20;
		}
		&[data-is-active='true'] {
			@apply opacity-100;
			&::before {
				@apply bg-transparent;
				transition: background-color 0.5s;
			}
		}
	}
</style>
