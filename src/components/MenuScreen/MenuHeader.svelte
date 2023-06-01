<script lang="ts">
	// IMPORTED ASSETS
	import YouTubeSVG from '$assets/svgs/youtube.svg';
	// IMPORTED UTILS
	import { toggleIsPlaying } from '$stores/playerStates';
</script>

<div class="header">
	<button class="brand" on:dblclick={toggleIsPlaying}>
		<img src="piano.svg" alt="logo" />
		<p class="text-sm">Virtual Piano By Arben</p>
	</button>
	<img class="youtube-icon" src={YouTubeSVG} alt="Youtube Icon" />
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
		.youtube-icon {
			@apply w-[50px] opacity-70 absolute top-[8px] right-[8px];
		}
	}
</style>
