<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { initializeStores } from '$stores/index';
	import { windowWidth } from '$stores/mediaStates';
	import { observeFullScreen, observeOrientation } from '$stores/settingsStates';
	import { noteList } from '$stores/pianoStates';
	import { isOpen as isMenuOpen } from '$stores/menuStates';
	import { pianoKeys } from '$utils/pianoKeys';
	import { filterKey } from '$utils/helpers';
	// IMPORTED COMPONENTS
	import PianoScreen from '$components/PianoScreen';
	import PianoKeyboard from '$components/PianoKeyboard';
	import OrientationNotice from '$components/OrientationNotice/OrientationNotice.svelte';
	import MenuScreen from '$components/MenuScreen/MenuScreen.svelte';

	// STATES
	let isShift = false;

	// UTILS
	const handleKeyDown = (event: KeyboardEvent) => {
		if ($isMenuOpen) return;
		if (event.key === 'Shift') isShift = true;
		let eventKey = filterKey(event.key);
		pianoKeys.map((key) => {
			if (key.bind !== eventKey || !(key.note in noteList)) return;
			if (!key.haveSharp) {
				noteList[key.note].isPressing.set(true);
				return;
			}
			if (!isShift && key.type === 'white') noteList[key.note].isPressing.set(true);
			else if (isShift && key.type === 'black') noteList[key.note].isPressing.set(true);
		});
	};
	const handleKeyUp = (event: KeyboardEvent) => {
		if ($isMenuOpen) return;
		if (event.key === 'Shift') isShift = false;
		let eventKey = filterKey(event.key);
		pianoKeys.map((key) => {
			if (key.bind === eventKey && key.note in noteList)
				noteList[key.note].isPressing.set(false);
		});
	};
	const handleResize = () => windowWidth.set(window.innerWidth);

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
	on:resize={handleResize}
	on:fullscreenchange={observeFullScreen}
	on:orientationchange={observeOrientation}
/>

<OrientationNotice>
	<div class="page">
		<div class="body">
			<PianoScreen />
			<MenuScreen />
		</div>
		<PianoKeyboard />
	</div>
</OrientationNotice>

<style lang="scss">
	:root {
		--bg-image: url('$assets/images/bg-2.png');
	}
	.page {
		@apply absolute w-full h-full flex flex-col overflow-hidden;
		.body {
			@apply flex-grow relative bg-fixed bg-cover bg-center;
			background-image: var(--bg-image);
		}
	}
</style>
