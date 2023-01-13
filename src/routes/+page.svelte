<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';
	import { pianoKeys } from '$utils/pianoKeys';
	// IMPORTED COMPONENTS
	import PianoScreen from '$components/PianoScreen/PianoScreen.svelte';
	import PianoKeyboard from '$components/PianoKeyboard';

	// STATES
	let isShift = false;

	// UTILS
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Shift') isShift = true;
		pianoKeys.map((key) => {
			if (key.bind === event.key.toUpperCase()) {
				const note = key.note.replace('#', 'S');
				if (!key.haveSharp) {
					// @ts-ignore
					isPressed[note].set(true);
					return;
				}
				try {
					if (!isShift && key.type === 'white') {
						// @ts-ignore
						isPressed[note].set(true);
					} else if (isShift && key.type === 'black') {
						// @ts-ignore
						isPressed[note].set(true);
					}
				} catch {}
				return;
			}
		});
	};
	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'Shift') isShift = false;
		pianoKeys.map((key) => {
			if (key.bind === event.key.toUpperCase()) {
				const note = !isShift ? key.note : key.note[0] + 'S' + key.note[1];
				try {
					// @ts-ignore
					isPressed[note].set(false);
				} catch {
					// @ts-ignore
					isPressed[key.note.replace('#', 'S')].set(false);
				}
				return;
			}
		});
	};

	// LIFECYCLES
	onMount(() => {
		Tone.start();
		Tone.loaded().then(() => {
			console.log('Tone loaded!');
		});
	});
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
	.page {
		@apply fixed w-full h-full bg-gray-800 flex flex-col;
		.top {
			@apply flex-grow;
		}
		.bottom {
		}
	}
</style>
