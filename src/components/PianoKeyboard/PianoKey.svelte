<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$utils/pianoKeys';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';

	// PROPS
	export let key: PianoKey, isMouseDown: boolean;

	// UTILS
	const handlePress = () => {
		// @ts-ignore
		isPressed[key.note].set(true);
	};
	const handleRelease = () => {
		// @ts-ignore
		isPressed[key.note].set(false);
	};
	const handleMouseEnter = () => {
		if (!isMouseDown) return;
		handlePress();
	};
	const handleMouseLeave = () => {
		handleRelease();
	};
</script>

<button
	class={`key ${key.type}-key ${key.note}`}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:mousedown={handlePress}
	on:mouseup={handleRelease}
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
			{key.note}
		</span>
	</div>
</button>

<style lang="scss">
	@import '$styles';
	.key {
		@apply mr-[.1vw] rounded-[.2vw] overflow-hidden cursor-pointer last:mr-0;
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
		@apply bg-slate-50 hover:bg-slate-300 text-gray-700 h-full;
		width: calc((100vw - (35 * 0.1vw)) / 36);
	}
	.black-key {
		--key-width: 1.75vw;
		@apply bg-gray-800 p-[.1vw];
		width: var(--key-width);
		height: 70%;
		transform: translate(calc(var(--key-width) / 2), -0.15vw);
		margin-left: calc((var(--key-width) / -1) - 0.1vw);
		.content {
			@apply bg-gray-900 hover:bg-gray-700 text-slate-300 rounded-[.2vw] overflow-hidden;
		}
	}
</style>
