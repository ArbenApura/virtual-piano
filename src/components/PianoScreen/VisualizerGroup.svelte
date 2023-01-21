<script lang="ts">
	// IMPORTED TYPES
	import type { NoteState } from '$stores/pianoStates';

	// PROPS
	export let note: NoteState;

	// STATES
	const { boundaries, isPressing } = note;

	// REACTIVE STATES
	$: boundary = (note.type === 'white' ? $boundaries[1] : $boundaries[0]) || { x: 0, width: 0 };
	$: bars = $isPressing ? ['40%', '60%', '80%', '60%', '40%'] : ['0', '0', '0', '0', '0'];
</script>

<div
	class="group {note.type}-group"
	style="width: {boundary.width}px; left: {boundary.x}px;"
	data-is-active={$isPressing}
>
	{#each bars as bar}
		<span class="bar" style="height: {bar}" />
	{/each}
</div>

<style lang="scss">
	.group {
		@apply absolute h-full flex items-center gap-[1px] opacity-50;
		.bar {
			@apply w-full min-h-[2px];
			transition: 0.2s;
		}
		&.white-group {
			.bar {
				@apply bg-slate-50;
			}
		}
		&.black-group {
			.bar {
				@apply bg-[#000];
			}
		}
		&[data-is-active='true'] {
			@apply opacity-100;
		}
	}
</style>
