<script lang="ts">
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoTiles from './PianoTiles.svelte';
</script>

<div class="screen">
	<div class="shader" />
	<div class="brand">
		<img src="piano.svg" alt="Logo" />
		<div class="text">
			<p>Virtual Piano</p>
		</div>
	</div>
	<div class="tiles">
		{#each pianoKeys as key}
			<PianoTiles type={key.type} note={key.note} />
		{/each}
	</div>
</div>

<style lang="scss">
	@import '$styles';
	.screen {
		@apply w-full h-full relative;
		.shader {
			@apply absolute h-full w-full bg-gradient-to-t from-transparent to-gray-900 opacity-75 z-30;
		}
		.brand {
			@apply absolute z-30 p-2;
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
		.tiles {
			@apply w-full h-full flex relative;
		}
	}
</style>
