<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	import { isPressed } from '$stores/pianoStates';
	import { filterKey } from '$utils/helpers';
	// IMPORTED COMPONENTS
	import PianoScreen from '$components/PianoScreen';
	import PianoKeyboard from '$components/PianoKeyboard';

	// STATES
	let isShift = false;

	// UTILS
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Shift') isShift = true;
		let eventKey = filterKey(event.key);
		pianoKeys.map((key) => {
			if (key.bind !== eventKey || !(key.note in isPressed)) return;
			if (!key.haveSharp) {
				isPressed[key.note].set(true);
				return;
			}
			if (!isShift && key.type === 'white') isPressed[key.note].set(true);
			else if (isShift && key.type === 'black') isPressed[key.note].set(true);
		});
	};
	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'Shift') isShift = false;
		let eventKey = filterKey(event.key);
		pianoKeys.map((key) => {
			if (key.bind === eventKey && key.note in isPressed) isPressed[key.note].set(false);
		});
	};

	// LIFECYCLES
	onMount(Tone.start);
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

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
		@apply fixed w-full h-full bg-gray-900 flex flex-col;
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
