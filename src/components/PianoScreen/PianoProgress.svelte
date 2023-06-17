<script lang="ts">
	// IMPORTED UTILS
	import { isPlaying, duration } from '$stores/playerStates';

	// STATES
	let isVisible = false;
	let tempDuration = 0;
	let timeout: NodeJS.Timeout;

	// REACTIVE STATMENTS
	$: $isPlaying
		? (() => {
				if (timeout) clearTimeout(timeout);
				isVisible = true;
				tempDuration = $duration;
		  })()
		: (() => {
				timeout = setTimeout(() => {
					isVisible = false;
					tempDuration = 0;
				}, 4000);
		  })();
</script>

<div class="wrapper" data-is-playing={$isPlaying} data-is-visible={isVisible}>
	<div class="progress-bar" style="animation-duration: {tempDuration}ms" />
</div>

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
			@apply opacity-20;
		}
	}
	.wrapper {
		@apply absolute top-0 w-full h-full z-10 opacity-0;
		transition: opacity calc(1000ms * var(--speed));
		.progress-bar {
			@apply absolute top-0 h-full;
			&::before {
				@apply bg-slate-50 absolute top-0 w-full h-full;
				content: '';
			}
		}
		&[data-is-visible='true'] {
			.progress-bar {
				animation: progress linear;
				&::before {
					animation: pulse calc(3000ms * var(--speed)) alternate infinite linear;
				}
			}
		}
		&[data-is-playing='true'] {
			@apply opacity-100;
		}
	}
</style>
