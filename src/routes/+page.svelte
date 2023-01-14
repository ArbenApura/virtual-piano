<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { pianoKeys } from '$utils/pianoKeys';
	import { isPressed } from '$stores/pianoStates';
	// IMPORTED COMPONENTS
	import PianoScreen from '$components/PianoScreen/PianoScreen.svelte';
	import PianoKeyboard from '$components/PianoKeyboard';

	// STATES
	let isShift = false;

	// UTILS
	const getKeyCode = (key: string) => {
		let keyCode = key.toUpperCase();
		switch (key) {
			case '!':
				keyCode = '1';
				break;
			case '@':
				keyCode = '2';
				break;
			case '#':
				keyCode = '3';
				break;
			case '$':
				keyCode = '4';
				break;
			case '%':
				keyCode = '5';
				break;
			case '^':
				keyCode = '6';
				break;
			case '&':
				keyCode = '7';
				break;
			case '*':
				keyCode = '8';
				break;
			case '(':
				keyCode = '9';
				break;
			case ')':
				keyCode = '0';
				break;
		}
		return keyCode;
	};
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Shift') isShift = true;
		let keyCode = getKeyCode(event.key);
		pianoKeys.map((key) => {
			if (key.bind === keyCode) {
				if (!key.haveSharp) {
					isPressed[key.note].set(true);
					return;
				}
				try {
					if (!isShift && key.type === 'white') {
						isPressed[key.note].set(true);
					} else if (isShift && key.type === 'black') {
						isPressed[key.note].set(true);
					}
				} catch {}
				return;
			}
		});
	};
	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'Shift') isShift = false;
		let keyCode = getKeyCode(event.key);
		pianoKeys.map((key) => {
			if (key.bind === keyCode) {
				try {
					isPressed[key.note].set(false);
					isPressed[key.note].set(false);
				} catch {}
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
		@apply fixed w-full h-full bg-gray-900 flex flex-col;
		.top {
			@apply flex-grow -mb-1;
		}
		.bottom {
			@apply z-50;
		}
	}
</style>
