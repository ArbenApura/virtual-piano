<script>
	// IMPORTED UTILS
	import { isOpen } from '$stores/menuStates';
	// IMPORTED COMPONENTS
	import MenuHeader from './MenuHeader.svelte';
</script>

<div class="screen" data-is-open={$isOpen}>
	<div class="screen-inner">
		<MenuHeader />
		{#if $isOpen}
			<span class="divider" />
		{/if}
	</div>
</div>

<style lang="scss">
	.screen {
		@apply absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-bottom z-[100];
		.screen-inner {
			@apply h-full flex flex-col;
			.divider {
				@apply bg-slate-50 w-full h-[2px];
			}
		}
		&[data-is-open='true'] {
			@apply fixed;
			background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)),
				url('$assets/images/bg-wood.png');
		}
	}
</style>
