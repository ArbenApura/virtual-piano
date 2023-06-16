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
		$pref-font-size: 0.9vw;
		@apply absolute bottom-[1vw] text-slate-50 opacity-0 z-[100] transition-none;
		transition: opacity calc(1000ms * var(--speed));
		font-size: clamp(8px, $pref-font-size, $pref-font-size);
		&[data-is-active='true'] {
			@apply opacity-70;
		}
	}
	.piece-name {
		@apply right-[1.8vw];
	}
	.piece-composer {
		@apply left-[1.8vw];
	}
</style>
