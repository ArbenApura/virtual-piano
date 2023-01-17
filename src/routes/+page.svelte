<script lang="ts">
	// IMPORTED COMPONENTS
	import PianoScreen from '$components/PianoScreen';
	import PianoKeyboard from '$components/PianoKeyboard';
</script>

<div class="page">
	<div class="top">
		<PianoScreen />
	</div>
	<div class="bottom">
		<PianoKeyboard />
	</div>
</div>

<style lang="scss">
	@import '$styles';
	:root {
		--bg-image: url('$assets/images/bg-1.png');
	}
	.page {
		@apply absolute w-full h-full flex flex-col;
		background-image: var(--bg-image);
		background-attachment: fixed;
		background-size: cover;
		background-position: bottom;
		.top {
			@apply flex-grow;
		}
		.bottom {
			@apply z-[100];
		}
	}
</style>
