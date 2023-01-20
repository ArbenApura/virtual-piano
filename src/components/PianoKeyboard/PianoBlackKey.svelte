<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$stores/pianoStates';
	// IMPORTED UTILS
	import { isPressed } from '$stores/pianoStates';
	import { isTouchScreen } from '$stores/mediaStates';
	import { visibility } from '$stores/settingStates';

	// PROPS
	export let key: PianoKey;

	// REACTIVE STATES
	$: isActive = isPressed[key.note];

	// UTILS
	const handlePress = () => isPressed[key.note].set(true);
	const handleRelease = () => isPressed[key.note].set(false);
</script>

<button id="{key.note}-key" class="key" data-is-active={$isActive}>
	<div class="key-body {key.type}-key">
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
	<div class="key-bottom" />
	<div
		class="wrapper"
		on:pointerdown={() => !$isTouchScreen && handlePress()}
		on:pointerup={() => !$isTouchScreen && handleRelease()}
		on:pointerout={() => !$isTouchScreen && handleRelease()}
		on:touchstart={() => $isTouchScreen && handlePress()}
		on:touchend={() => $isTouchScreen && handleRelease()}
	/>
</button>

<style lang="scss">
	.key {
		@apply bg-[#111] relative w-full h-full -mt-[.3vw] rounded-t-[.2vw] rounded-b-none overflow-hidden flex flex-col border-x-[.1vw] border-b-[.1vw] border-[#333];
		height: calc(100% + 0.3vw);
		box-shadow: 0.6vw -0.1vw 0.6vw rgb(0, 0, 0, 0.3);
		.key-body {
			@apply w-full h-full flex flex-col flex-grow text-center rounded-b-[.5vw] mb-[.1vw];
			font-size: 0.5vw;
			background-image: linear-gradient(to bottom, #000, #000, #000, #222, #222);
			span {
				@apply py-[.2vw];
			}
			.bind {
				@apply flex flex-col flex-grow;
				.ti {
					@apply py-[.1vw];
				}
			}
			&.white-key {
				.note {
					font-size: 0.8vw;
				}
			}
			&.black-key {
				@apply text-slate-300 rounded-[.2vw] overflow-hidden;
			}
		}
		.key-bottom {
			@apply w-full h-[8%] rounded-t-[.2vw] bg-[#000];
		}
		.wrapper {
			@apply absolute w-full h-full;
		}
		&[data-is-active='true'] {
			@apply h-full mt-0;
			box-shadow: none;
			.key-bottom {
				@apply h-[0%];
			}
		}
	}
</style>
