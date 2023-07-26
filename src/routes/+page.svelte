<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { initializeStores, isInitialized } from '$stores/index';
	import { windowWidth } from '$stores/mediaStates';
	import { isAudioOnly, observeFullScreen, observeOrientation } from '$stores/settingsStates';
	import { noteList } from '$stores/pianoStates';
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
		if (!$isInitialized) return;
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
		if (!$isInitialized) return;
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
		// VARIABLES
		$composer: 'mozart';
		// DEFAULT
		--speed: 4;
		--bg-position: center;
		--bg-position-x: -20px;
		--bg-position-y: 0px;
		--bg-size: 1320px;
		--bg-image: url('$assets/images/#{$composer}.png');
		--bar-bg-image: var(--bg-image);
		--bar-bg-size: none;
		--bar-bg-position-x: left;
		--bar-bg-position-y: top;
		--bar-filter: none;
		// CUSTOM
		@if $composer == 'bach' {
			--bar-filter: brightness(2) contrast(2.5) grayscale(100%);
		} @else if $composer == 'beethoven' {
			--bar-filter: brightness(1.5) contrast(2) saturate(2) hue-rotate(45deg);
		} @else if $composer == 'chopin' {
			--bar-bg-image: url('$assets/textures/2.png');
			--bar-filter: contrast(2) hue-rotate(40deg);
		} @else if $composer == 'czerny' {
			--bar-bg-image: url('$assets/textures/czerny.png');
			--bar-bg-size: cover;
			--bar-filter: brightness(4) contrast(1.5) saturate(1.5);
		} @else if $composer == 'debussy' {
			--bar-bg-image: url('$assets/textures/7.png');
			--bar-bg-size: cover;
			--bar-filter: brightness(2.25);
		} @else if $composer == 'liszt' {
			--bar-bg-image: url('$assets/textures/3.png');
			--bar-filter: brightness(2) saturate(2.5) hue-rotate(30deg);
		} @else if $composer == 'mozart' {
			--bar-bg-image: url('$assets/textures/1.png');
			--bar-filter: brightness(2) contrast(2) saturate(1.5);
			--bar-bg-position-x: 4px;
		} @else if $composer == 'rachmaninoff' {
			--bar-bg-image: url('$assets/textures/5.png');
			--bar-filter: brightness(2) hue-rotate(80deg);
		} @else if $composer == 'tchaikovsky' {
			--bar-bg-image: url('$assets/textures/1.png');
			--bar-filter: brightness(1.5) contrast(2) hue-rotate(270deg);
		} @else if $composer == 'vivaldi' {
			--bar-bg-image: url('$assets/textures/4.png');
			--bar-filter: brightness(2);
		}
	}
	.page {
		@apply absolute w-full h-full flex flex-col overflow-hidden;
		width: 1280px;
		height: 720px;
		.body {
			@apply flex-grow relative bg-fixed;
			background-image: var(--bg-image);
			background-position: var(--bg-position);
			background-position-x: var(--bg-position-x);
			background-position-y: var(--bg-position-y);
			background-size: var(--bg-size);
		}
	}
</style>
