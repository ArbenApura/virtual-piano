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
		let keyCode = getKeyCode(event.key);
		pianoKeys.map((key) => {
			if (key.bind === keyCode) {
				try {
					// @ts-ignore
					isPressed[key.note.replace(/#|S/g, '')].set(false);
					// @ts-ignore
					isPressed[key.note.replace('#', 'S')].set(false);
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
