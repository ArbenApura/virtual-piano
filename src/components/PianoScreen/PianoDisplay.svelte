<script lang="ts">
	// IMPORTED UTILS
	import { visibility } from '$stores/settingStates';
	import { name, composer, isPlaying } from '$stores/playerStates';

	// STORE STATES
	const { playerDetails } = visibility;
</script>

{#if $playerDetails}
	<small class="piece-name" data-is-active={$isPlaying}>{$name}</small>
	<small class="piece-composer" data-is-active={$isPlaying}>{$composer}</small>
{/if}

<style lang="scss">
	@import '$styles';
	.piece-name,
	.piece-composer {
		@apply absolute bottom-[1vw] text-slate-50 opacity-0 z-50 transition-none;
		font-size: clamp(8px, 0.8vw, 0.8vw);
		&[data-is-active='true'] {
			@apply opacity-25;
			transition: opacity 0.5s;
		}
	}
	.piece-name {
		@apply right-[1.8vw];
	}
	.piece-composer {
		@apply left-[1.8vw];
	}
</style>
