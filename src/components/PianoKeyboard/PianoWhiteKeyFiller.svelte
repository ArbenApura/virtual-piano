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
