<script lang="ts">
	// IMPORTED UTILS
	import {
		visibility,
		isFullScreen,
		toggleIsFullScreen,
		isFullScreenSupported,
	} from '$stores/settingStates';
	import { name, composer, isPlaying, toggleIsPlaying } from '$stores/playerStates';
	import { noteList } from '$stores/pianoStates';
	import { pianoNotes } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoTile from './PianoTile.svelte';
	import VisualizerTile from './VisualizerTile.svelte';

	// STORE STATES
	const { playerDetails, visualizer } = visibility;
</script>

<div class="screen">
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
	<div class="tiles">
		{#each pianoNotes as key}
			<PianoTile note={noteList[key]} />
		{/each}
	</div>
	{#if $visualizer}
		<div class="visualizer">
			{#each pianoNotes as key}
				<VisualizerTile note={noteList[key]} />
			{/each}
		</div>
	{/if}
	<div class="lines">
		{#each Array(9).fill(0) as _}
			<div />
		{/each}
	</div>
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
			@apply bg-gradient-to-t from-transparent to-gray-900 opacity-80 z-50;
		}
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
		.tiles {
			@apply relative w-full flex;
			height: calc(100%);
		}
		.visualizer {
			@apply absolute top-[50%] w-full h-[15vw] translate-y-[-50%] flex items-center z-[60];
		}
		.lines {
			@apply flex items-stretch z-[70];
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
