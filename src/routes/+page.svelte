<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { initializeStores } from '$stores/index';
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
		{#if !$isAudioOnly}
			<PianoKeyboard />
		{/if}
	</div>
</OrientationNotice>

<style lang="scss">
	:root {
		// VARIABLES
		$composer: 'liszt';
		// DEFAULT
		--speed: 1;
		--bg-position: center;
		--bg-position-x: -20px;
		--bg-position-y: 0px;
		--bg-size: 1320px;
		--bg-image: url('$assets/images/#{$composer}.png');
		--bar-bg-image: url('$assets/textures/1.png');
		--bar-bg-size: none;
		--bar-bg-position-x: left;
		--bar-bg-position-y: top;
		--bar-filter-none: brightness(2) grayscale(100%);
		--bar-filter-melody: none;
		--bar-filter-accompaniment: none;
		// CUSTOM
		@if $composer == 'bach' {
			--bar-filter: brightness(2) contrast(2.5) grayscale(100%);
		} @else if $composer == 'beethoven' {
			--bar-bg-image: var(--bg-image);
			--bar-filter: brightness(1.5) contrast(2) saturate(1.25) hue-rotate(45deg);
		} @else if $composer == 'chopin' {
			--bar-bg-image: url('$assets/textures/2.png');
			--bar-filter: contrast(2) hue-rotate(40deg);
		} @else if $composer == 'czerny' {
			--bar-bg-image: url('$assets/textures/czerny.png');
			--bar-bg-size: cover;
			--bar-filter: brightness(4) contrast(1.5) saturate(1.5);
		} @else if $composer == 'liszt' {
			--bar-filter-melody: brightness(1.5) contrast(2) hue-rotate(150deg);
			--bar-filter-accompaniment: brightness(1.5) contrast(2) hue-rotate(0deg);
		} @else if $composer == 'rachmaninoff' {
			--bar-filter: brightness(1.5) contrast(2) hue-rotate(0deg);
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
