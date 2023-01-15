<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$utils/pianoKeys';
	import type { Pointer } from './types';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';
	import { visibility } from '$stores/settingStates';
	import { isTouchScreen } from '$stores/mediaStates';
	// IMPORTED COMPONENTS
	import TouchScreenConfig from './TouchScreenConfig.svelte';

	// PROPS
	export let key: PianoKey, pointer: Pointer;

	// REFS
	let keyEl: HTMLButtonElement;

	// REACTIVE STATES
	$: isActive = isPressed[key.note];

	// UTILS
	const handlePress = () => isPressed[key.note].set(true);
	const handleRelease = () => isPressed[key.note].set(false);
	const handlePointerOver = () => !$isTouchScreen && pointer.isDown && handlePress();
</script>

{#if $isTouchScreen}
	<TouchScreenConfig {...{ keyEl, pointer, handlePress, handleRelease }} />
{/if}

<button
	class={`key ${key.type}-key ${key.note}`}
	data-is-active={$isActive}
	bind:this={keyEl}
	on:touchstart={handlePress}
	on:pointerdown={handlePress}
	on:pointerup={handleRelease}
	on:pointerover={handlePointerOver}
	on:pointerout={handleRelease}
>
	<div class="content">
		<span class="bind">
			{#if $visibility.keyboardHint.bind}
				{key.bind}
				{#if key.type === 'black'}
					<i class="ti ti-plus" />
					<i class="ti ti-arrow-big-top" />
				{/if}
			{/if}
		</span>
		<span class="note">
			{#if $visibility.keyboardHint.note}
				{key.note.replace('S', '#')}
			{/if}
		</span>
	</div>
</button>

<style lang="scss">
	@import '$styles';
	.key {
		@apply rounded-[.1vw] overflow-hidden;
		.content {
			@apply h-full flex flex-col text-center;
			font-size: 0.5vw;
			span {
				@apply py-[.2vw];
			}
			.bind {
				@apply flex flex-col flex-grow;
				.ti {
					@apply py-[.1vw];
				}
			}
		}
		&.white-key {
			@apply border-l border-b border-slate-200;
			width: calc(100vw / 35);
			background-image: linear-gradient(
				to bottom,
				theme('colors.slate.50'),
				theme('colors.slate.100')
			);
			box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset,
				0 0 3px rgba(0, 0, 0, 0.2);
			.content {
				.note {
					font-size: 0.8vw;
				}
			}
			&[data-is-active='true'] {
				@apply border-slate-300;
				background-image: linear-gradient(
					to bottom,
					theme('colors.slate.50'),
					theme('colors.slate.200')
				);
				box-shadow: 2px 0 3px rgba(0, 0, 0, 0.01) inset,
					-5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
			}
		}
		&.black-key {
			--key-width: 1.75vw;
			@apply z-10 h-4/6;
			width: var(--key-width);
			background-image: linear-gradient(45deg, #222 0%, #555 100%);
			box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
				0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
			transform: translate(calc(var(--key-width) / 2), -0.15vw);
			margin-left: calc((var(--key-width) / -1));
			.content {
				@apply text-slate-300 rounded-[.2vw] overflow-hidden;
			}
			&[data-is-active='true'] {
				box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
					0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
				background: linear-gradient(to right, #444 0%, #222 100%);
			}
		}
	}
</style>
