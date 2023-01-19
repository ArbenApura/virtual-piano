<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { initializeStores } from '$stores/index';
	import { resizeCount } from '$stores/mediaStates';
	import { observeFullScreen } from '$stores/settingStates';
	import { isPressed } from '$stores/pianoStates';
	import { pianoKeys } from '$utils/pianoKeys';
	import { filterKey } from '$utils/helpers';
	// IMPORTED STYLES
	import '$styles/tailwind.scss';

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

	// EVENTS
	Tone.loaded().then(() => {
		// REMOVE LOADING STATE
		const loadingEl = document.querySelector('.loading');
		if (loadingEl) {
			loadingEl.classList.add('opacity-0');
			setTimeout(() => document.body.removeChild(loadingEl), 500);
		}
	});

	// LIFECYCLES
	onMount(() => {
		Tone.start();
		initializeStores();
	});
</script>

<svelte:window
	on:keydown={handleKeyDown}
	on:keyup={handleKeyUp}
	on:resize={() => resizeCount.update((v) => ++v)}
	on:fullscreenchange={observeFullScreen}
/>

<main>
	<slot />
</main>

<style lang="scss">
	main {
		@apply fixed w-full h-full overflow-hidden;
	}
</style>
