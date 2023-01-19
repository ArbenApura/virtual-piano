<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';

	// PROPS
	export let key: PianoKey;

	// REACTIVE STATES
	$: isActive = isPressed[key.note];
</script>

<div id="{key.note}-filler" class="filler" data-is-active={$isActive}>
	<div class="filler-inner">
		<span>{key.bind}</span>
	</div>
</div>

<style lang="scss">
	.filler {
		@apply -mb-[4px];
		.filler-inner {
			@apply bg-slate-50 w-full h-full rounded-t-[.2vw] overflow-hidden border-x-[.1vw] border-slate-300 pt-[.2vw] text-[0.5vw] text-center;
		}
		&[data-is-active='true'] {
			@apply pt-[.2vw];
		}
	}
</style>
