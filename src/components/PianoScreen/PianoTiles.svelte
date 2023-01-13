<script lang="ts">
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';

	// PROPS
	export let type: string, note: string;

	// REACTIVE STATES
	$: isActive = (() => {
		// @ts-ignore
		return isPressed[note.replace('#', 'S')];
	})();
</script>

<div class={`tiles ${type}-tiles`} data-is-active={$isActive} />

<style lang="scss">
	@import '$styles';
	.tiles {
		@apply mr-[.1vw] last:mr-0 bg-gray-900;
		&[data-is-active='true'] {
			@apply bg-gray-800;
		}
	}
	.white-tiles {
		@apply h-full;
		width: calc((100vw - (35 * 0.1vw)) / 36);
	}
	.black-tiles {
		--tiles-width: 1.75vw;
		@apply p-[.1vw] pt-0;
		width: var(--tiles-width);
		transform: translate(calc(var(--tiles-width) / 2), -0.15vw);
		margin-left: calc((var(--tiles-width) / -1) - 0.1vw);
	}
</style>
