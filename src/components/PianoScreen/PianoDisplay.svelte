<script lang="ts">
	// IMPORTED UTILS
	import {
		visibility,
		isFullScreen,
		toggleIsFullScreen,
		isFullScreenSupported,
	} from '$stores/settingStates';
	import { name, composer, isPlaying, toggleIsPlaying } from '$stores/playerStates';

	// STORE STATES
	const { playerDetails } = visibility;
</script>

<button class="brand" on:dblclick={toggleIsPlaying}>
	<img src="piano.svg" alt="Logo" />
	<div class="text">
		<p>Virtual Piano</p>
	</div>
</button>
{#if $playerDetails}
	<small class="piece-name" data-is-active={$isPlaying}>{$name}</small>
	<small class="piece-composer" data-is-active={$isPlaying}>{$composer}</small>
{/if}
{#if $isFullScreenSupported}
	<button class="fullscreen-toggler" on:click={toggleIsFullScreen}>
		<i class="ti ti-{$isFullScreen ? 'minimize' : 'maximize'}" />
	</button>
{/if}

<style lang="scss">
	@import '$styles';
	.brand {
		@apply absolute z-[200] p-2;
		@include flex-center;
		img {
			@apply w-[35px] mr-1;
		}
		.text {
			@apply flex-col;
			@include flex-center;
			p {
				@apply text-slate-50 text-[16px];
			}
		}
	}
	.piece-name,
	.piece-composer {
		@apply absolute bottom-[1vw] text-slate-50 opacity-0 z-[200] transition-none;
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
	.fullscreen-toggler {
		@apply absolute top-4 right-4 z-[200];
		.ti {
			@apply text-slate-50 text-[25px];
		}
	}
</style>
