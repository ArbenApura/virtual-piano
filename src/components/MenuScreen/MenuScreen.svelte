<script>
	// IMPORTED UTILS
	import { isOpen } from '$stores/menuStates';
	// IMPORTED COMPONENTS
	import MenuHeader from './MenuHeader.svelte';
	import MenuBody from './MenuBody.svelte';
</script>

<div class="screen" data-is-open={$isOpen}>
	<div class="screen-inner">
		<MenuHeader />
		{#if $isOpen}
			<MenuBody />
		{/if}
	</div>
</div>

<style lang="scss">
	.screen {
		@apply text-slate-50 absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-bottom z-[100];
		.screen-inner {
			@apply h-full flex flex-col;
		}
		&[data-is-open='true'] {
			@apply bg-gray-800 fixed;
		}
	}
</style>
