<script lang="ts">
	// IMPORTED UTILS
	import { toggleIsPlaying, isChanging } from '$stores/playerStates';
	import { isFullScreen, toggleIsFullScreen } from '$stores/settingsStates';
</script>

<div class="header">
	<button class="brand" disabled={$isChanging} on:dblclick={toggleIsPlaying}>
		<img src="piano.svg" alt="logo" />
		<p class="text-sm">Virtual Piano By Arben</p>
	</button>
	<div class="btn-group">
		<button on:click={toggleIsFullScreen}>
			<i class={`ti ti-${$isFullScreen ? 'minimize' : 'maximize'}`} />
		</button>
	</div>
</div>

<style lang="scss">
	@import '$styles';
	.header {
		@apply p-3;
		@include flex-start-center;
		&[data-is-open='true'] {
			@apply bg-gray-900 border-b border-gray-800;
		}
		.brand {
			@apply flex-grow gap-2 opacity-70;
			@include flex-start-center;
			img {
				@apply w-[30px];
			}
		}
		.btn-group {
			@apply gap-3;
			@include flex-center;
			button {
				@apply opacity-50 hover:opacity-100;
				@include flex-center;
				i {
					@apply text-[25px];
				}
			}
		}
	}
</style>
