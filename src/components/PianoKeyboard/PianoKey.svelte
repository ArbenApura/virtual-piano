<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	import type { Pointer } from './types';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';
	import { isTouchScreen } from '$stores/mediaStates';
	// IMPORTED COMPONENTS
	import TouchScreenConfig from './TouchScreenConfig.svelte';
	import PianoKeyContent from './PianoKeyContent.svelte';

	// PROPS
	export let key: PianoKey, pointer: Pointer, isSwiping: boolean;

	// REFS
	let keyEl: HTMLButtonElement;

	// REACTIVE STATES
	$: isActive = isPressed[key.note];

	// UTILS
	const handlePress = () => isPressed[key.note].set(true);
	const handleRelease = () => isPressed[key.note].set(false);
	const handlePointerOver = () => isSwiping && handlePress();
</script>

{#if $isTouchScreen}
	<button
		class="key {key.type}-key"
		data-is-active={$isActive}
		bind:this={keyEl}
		on:touchstart|preventDefault={handlePress}
		on:touchend|preventDefault={handleRelease}
		on:touchcancel|preventDefault={handleRelease}
	>
		<PianoKeyContent {key} />
		<TouchScreenConfig {...{ keyEl, pointer, handlePress, handleRelease, isSwiping }} />
	</button>
{:else}
	<button
		class="key {key.type}-key"
		data-is-active={$isActive}
		on:pointerdown={handlePress}
		on:pointerup={handleRelease}
		on:pointerover={handlePointerOver}
		on:pointerout={handleRelease}
	>
		<PianoKeyContent {key} />
	</button>
{/if}

<style lang="scss">
	@import '$styles';
	.key {
		@apply rounded-[.1vw] overflow-hidden;
		&.white-key {
			@apply border-l border-b border-slate-200 z-10;
			width: calc(100vw / 35);
			background-image: linear-gradient(
				to bottom,
				theme('colors.slate.50'),
				theme('colors.slate.100')
			);
			box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset,
				0 0 3px rgba(0, 0, 0, 0.2);
			&[data-is-active='true'] {
				@apply border-slate-300;
				background-image: linear-gradient(
					to bottom,
					theme('colors.slate.50'),
					theme('colors.slate.200')
				);
				box-shadow: 2px 0 3px rgba(0, 0, 0, 0.01) inset,
					-5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.4);
			}
		}
		&.black-key {
			--key-width: 1.75vw;
			@apply h-[65%] z-20;
			width: var(--key-width);
			background-image: linear-gradient(45deg, #222 0%, #555 100%);
			box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
				0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
			transform: translate(calc(var(--key-width) / 2), -0.15vw);
			margin-left: calc((var(--key-width) / -1));
			&[data-is-active='true'] {
				box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
					0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
				background: linear-gradient(to right, #444 0%, #222 100%);
			}
		}
	}
</style>
