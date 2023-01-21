<script lang="ts">
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	import { isFullScreen, toggleIsFullScreen } from '$stores/settingStates';
	import { toggleIsPlaying } from '$stores/playerStates';
	// IMPORTED COMPONENTS
	import PianoTile from './PianoTile.svelte';
	import Visualizer from './Visualizer.svelte';
</script>

<div class="screen">
	<button class="brand" on:dblclick={toggleIsPlaying}>
		<img src="piano.svg" alt="Logo" />
		<div class="text">
			<p>Virtual Piano</p>
		</div>
	</button>
	<button class="fullscreen-toggler" on:click={toggleIsFullScreen}>
		<i class="ti ti-{$isFullScreen ? 'minimize' : 'maximize'}" />
	</button>
	<div class="tiles">
		{#each pianoKeys as pianoKey}
			<PianoTile {pianoKey} />
		{/each}
	</div>
	<div class="lines">
		{#each Array(9).fill(null) as _}
			<div />
		{/each}
	</div>
	<Visualizer />
</div>

<style lang="scss">
	@import '$styles';
	.screen {
		@apply w-full h-full relative border-b-[1px] border-gray-900;
		.lines,
		&::before,
		&::after {
			@apply absolute top-0 w-full;
			content: '';
			height: calc(100%);
		}
		&::before {
			@apply opacity-50 bg-gray-900;
		}
		&::after {
			@apply bg-gradient-to-t from-transparent to-gray-900 opacity-75 z-50;
		}
		.brand {
			@apply absolute z-[200] p-2;
			@include flex-center;
			img {
				@apply w-[40px] mr-2;
			}
			.text {
				@apply flex-col;
				@include flex-center;
				p {
					@apply text-slate-50 text-base;
				}
			}
		}
		.fullscreen-toggler {
			@apply absolute top-4 right-4 z-[200];
			.ti {
				@apply text-slate-50 text-[25px];
			}
		}
		.tiles {
			@apply relative w-full flex;
			height: calc(100%);
		}
		.lines {
			@apply flex items-stretch z-40;
			div {
				@apply border-r-[1px] border-gray-900;
				&:nth-child(2n + 1) {
					width: 8.65vw;
				}
				&:nth-child(2n) {
					width: 10.77vw;
				}
			}
		}
	}
</style>
