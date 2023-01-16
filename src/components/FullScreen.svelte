<script lang="ts">
	// IMPORTED LIB-UTILS
	import { onMount } from 'svelte';
	// IMPORTED UTILS
	import { isFullScreen } from '$stores/settingStates';

	// REFS
	let screenEl: HTMLDivElement;

	// STATES
	let isMounted = false;
	let isFullScreenSupported = false;
	let exitFullScreen: () => Promise<void>;
	let requestFullScreen: () => Promise<void>;

	// REACTIVE STATEMENTS
	$: if (isMounted && isFullScreenSupported) {
		if ($isFullScreen) requestFullScreen();
		else if (document.fullscreenElement) exitFullScreen();
	}

	// LIFECYCLES
	onMount(() => {
		try {
			if (!document || !screenEl) return;
			isFullScreenSupported =
				document.fullscreenEnabled ||
				// @ts-ignore
				document.webkitFullscreenEnabled ||
				// @ts-ignore
				document.mozFullScreenEnabled ||
				// @ts-ignore
				document.msFullscreenEnabled ||
				false;
			exitFullScreen = (
				document.exitFullscreen ||
				// @ts-ignore
				document.mozCancelFullScreen ||
				// @ts-ignore
				document.webkitExitFullscreen ||
				// @ts-ignore
				document.msExitFullscreen ||
				(() => {})
			).bind(document);
			requestFullScreen = (
				screenEl.requestFullscreen ||
				// @ts-ignore
				screenEl.mozRequestFullScreen ||
				// @ts-ignore
				screenEl.webkitRequestFullscreen ||
				// @ts-ignore
				screenEl.msRequestFullscreen ||
				(() => {})
			).bind(screenEl);
			isMounted = true;
		} catch (error) {
			console.error(error);
		}
	});
</script>

<div bind:this={screenEl}>
	<slot />
</div>
