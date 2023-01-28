<script lang ts>
	// IMPORTED UTILS
	import { currentTab } from '$stores/menuStates';
	// IMPORTED COMPONENTS
	import AboutTab from './AboutTab';
	import ScoresTab from './ScoresTab';
	import SettingsTab from './SettingsTab';
</script>

<div class="body">
	<div class="body-inner">
		{#if $currentTab === 'about'}
			<AboutTab />
		{:else if $currentTab === 'scores'}
			<ScoresTab />
		{:else if $currentTab === 'settings'}
			<SettingsTab />
		{/if}
	</div>
</div>

<style lang="scss">
	@import '$styles';
	.body {
		@apply overflow-auto;
		.body-inner {
			@apply w-full max-w-[1280px] mx-auto p-4;
			@include screen-down('sm') {
				@apply p-2;
			}
		}
	}
</style>
