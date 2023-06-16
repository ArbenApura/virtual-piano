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
		$composer: 'czerny';
		// DEFAULT
		--speed: 4;
		--bg-position: center;
		--bg-position-x: -20px;
		--bg-position-y: 0px;
		--bg-size: 1320px;
		--bg-image: url('$assets/images/#{$composer}.png');
		--bar-bg-image: var(--bg-image);
		--bar-bg-size: none;
		--bar-filter: none;
		// CUSTOM
		@if $composer == 'beethoven' {
			--bar-brightness: brightness(1.25) contrast(1.75) saturate(1.25) hue-rotate(45deg);
		} @else if $composer == 'czerny' {
			--bar-bg-size: cover;
			--bar-filter: brightness(4) contrast(1.25) saturate(1.25);
		} @else if $composer == 'chopin' {
			--bar-filter: brightness(3) contrast(1) saturate(1) hue-rotate(0deg);
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
