<script lang="ts">
	// IMPORTED COMPONENTS
	import PianoScreen from '$components/PianoScreen';
	import PianoKeyboard from '$components/PianoKeyboard';
</script>

<div class="page">
	<div class="piano-screen">
		<PianoScreen />
	</div>
	<PianoKeyboard />
</div>

<style lang="scss">
	@import '$styles';
	:global(canvas) {
		@apply absolute w-full h-full;
	}
	:root {
		--bg-image: url('$assets/images/bg-1.png');
	}
	.page {
		@apply absolute w-full h-full flex flex-col;
		.piano-screen {
			@apply flex-grow relative;
			background-image: var(--bg-image);
			background-attachment: fixed;
			background-size: cover;
			background-position: bottom;
		}
	}
</style>
