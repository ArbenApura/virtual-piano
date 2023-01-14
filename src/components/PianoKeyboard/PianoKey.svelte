<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$utils/pianoKeys';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';

	// PROPS
	export let key: PianoKey, isPointerDown: boolean;

	// REACTIVE STATES
	$: isActive = isPressed[key.note];

	// UTILS
	const handlePress = () => isPressed[key.note].set(true);
	const handleRelease = () => isPressed[key.note].set(false);
	const handlePointerEnter = () => {
		if (!isPointerDown) return;
		handlePress();
	};
	const handlePointerLeave = () => {
		handleRelease();
	};
</script>

<button
	class={`key ${key.type}-key ${key.note}`}
	data-is-active={$isActive}
	on:pointerenter={handlePointerEnter}
	on:pointerleave={handlePointerLeave}
	on:pointerdown={handlePress}
	on:pointerup={handleRelease}
>
	<div class="content">
		<span class="bind">
			{key.bind}
			{#if key.type === 'black'}
				<i class="ti ti-plus" />
				<i class="ti ti-arrow-big-top" />
			{/if}
		</span>
		<span class="note">
			{key.note.replace('S', '#')}
		</span>
	</div>
</button>

<style lang="scss">
	@import '$styles';
	.key {
		@apply mr-[.1vw] rounded-[.2vw] overflow-hidden cursor-pointer last:mr-0;
		&[data-is-active='true'] {
			@apply brightness-90;
		}
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
	}
	.white-key {
		@apply bg-slate-50 text-gray-700 h-full;
		width: calc((100vw - (35 * 0.1vw)) / 36);
		&:hover,
		&[data-is-active='true'] {
			@apply bg-slate-300;
		}
		.content {
			.note {
				font-size: 0.8vw;
			}
		}
	}
	.black-key {
		--key-width: 1.75vw;
		@apply bg-gray-800 p-[.1vw] z-10;
		width: var(--key-width);
		height: 70%;
		transform: translate(calc(var(--key-width) / 2), -0.15vw);
		margin-left: calc((var(--key-width) / -1) - 0.1vw);
		&[data-is-active='true'] {
			.content {
				@apply bg-gray-700;
			}
		}
		.content {
			@apply bg-gray-900 hover:bg-gray-700 text-slate-300 rounded-[.2vw] overflow-hidden;
		}
	}
</style>
