<script lang="ts">
	// IMPORTED TYPES
	import type { PianoKey } from '$utils/pianoKeys';
	// IMPORTED UTILS
	import { visibility } from '$stores/settingStates';

	// PROPS
	export let key: PianoKey;
</script>

<div class="content {key.type}-key">
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

<style lang="scss">
	@import '$styles';
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
		&.white-key {
			.note {
				font-size: 0.8vw;
			}
		}
		&.black-key {
			@apply text-slate-300 rounded-[.2vw] overflow-hidden;
		}
	}
</style>
