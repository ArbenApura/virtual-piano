<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { initializeStores } from '$stores/index';
	import { resizeCount } from '$stores/mediaStates';
	import { observeFullScreen } from '$stores/settingStates';
	// IMPORTED STYLES
	import '$styles/tailwind.scss';

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
	onMount(initializeStores);
</script>

<svelte:window
	on:resize={() => resizeCount.update((v) => ++v)}
	on:fullscreenchange={observeFullScreen}
/>

<slot />
