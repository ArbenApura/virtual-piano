<script lang="ts">
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoTiles from './PianoTiles.svelte';
</script>

<div class="screen">
	<button class="brand">
		<img src="piano.svg" alt="Logo" />
		<div class="text">
			<p>Virtual Piano</p>
		</div>
	</button>
	<div class="tiles">
		{#each pianoKeys as key}
			<PianoTiles type={key.type} note={key.note} />
		{/each}
	</div>
	<div class="lines">
		{#each Array(9).fill(null) as _}
			<div />
		{/each}
	</div>
</div>

<style lang="scss">
	@import '$styles';
	.screen {
		@apply w-full h-full relative;
		&::before {
			@apply absolute w-full h-full opacity-50;
			content: '';
			background-image: url('$assets/bg-1.png');
			background-attachment: fixed;
			background-size: cover;
			background-position: bottom;
		}
		&::after {
			@apply absolute top-0 h-full w-full bg-gradient-to-t from-transparent to-gray-900 z-30 opacity-75;
			content: '';
		}
		.brand {
			@apply absolute z-50 p-2;
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
		.lines {
			@apply absolute w-full h-full top-0 flex items-stretch z-40 opacity-100;
			div {
				@apply border-r-[.2vw] border-gray-900 w-[50px];
				&:nth-child(2n + 1) {
					width: 8.35vw;
				}
				&:nth-child(2n) {
					width: 11.1vw;
				}
			}
		}
	}
</style>
