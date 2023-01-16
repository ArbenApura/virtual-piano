<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	import * as Tone from 'tone';
	// IMPORTED UTILS
	import { initializeStores } from '$stores/index';
	import { resizeCount } from '$stores/mediaStates';
	// IMPORTED COMPONENTS
	import FullScreen from '$components/FullScreen.svelte';
	// IMPORTED STYLES
	import '$styles/tailwind.scss';

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

<svelte:window on:resize={() => resizeCount.update((v) => ++v)} />

<FullScreen>
	<slot />
</FullScreen>
