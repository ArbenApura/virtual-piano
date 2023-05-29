<script lang="ts">
	// IMPORTED UTILS
	import { name, composer, isPlaying } from '$stores/playerStates';
</script>

<small class="piece-name" data-is-active={$isPlaying}>{$name}</small>
<small class="piece-composer" data-is-active={$isPlaying}>{$composer}</small>

<style lang="scss">
	@import '$styles';
	.piece-name,
	.piece-composer {
		@apply absolute bottom-[1vw] text-slate-50 opacity-0 z-[100] transition-none;
		font-size: clamp(8px, 0.8vw, 0.8vw);
		&[data-is-active='true'] {
			@apply opacity-50;
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
