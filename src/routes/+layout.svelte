<script lang="ts">
	// IMPORTED STYLES
	import '$styles/tailwind.scss';
</script>

<slot />

<style>
	:global(body) {
		@apply bg-gray-800;
	}
</style>
