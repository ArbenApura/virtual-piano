<script>
	// IMPORTED COMPONENTS
	import MenuHeader from './MenuHeader.svelte';
</script>

<div class="screen">
	<div class="screen-inner">
		<MenuHeader />
	</div>
</div>

<style lang="scss">
	.screen {
		@apply text-slate-50 absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-bottom z-[100];
		.screen-inner {
			@apply h-full flex flex-col;
		}
	}
</style>
