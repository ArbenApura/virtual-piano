<script lang="ts">
	// IMPORTED UTILS
	import { isPlaying, duration } from '$stores/playerStates';
</script>

<div class="progress-bar" style="animation-duration: {$duration}ms" data-is-playing={$isPlaying} />

<style lang="scss">
	@keyframes progress {
		from {
			@apply w-0;
		}
		to {
			@apply w-full;
		}
	}
	@keyframes pulse {
		from {
			@apply opacity-0;
		}
		to {
			@apply opacity-10;
		}
	}
	.progress-bar {
		@apply absolute top-0 h-full z-10;
		&::before {
			@apply bg-slate-50 absolute top-0 w-full h-full;
			content: '';
			animation: pulse 6s alternate infinite linear;
		}
		&[data-is-playing='true'] {
			animation: progress;
		}
	}
</style>
