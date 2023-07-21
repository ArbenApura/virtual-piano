<div class="lines">
	{#each Array(12).fill(0) as _}
		<div />
	{/each}
</div>

<style lang="scss">
	.lines {
		@apply absolute top-0 opacity-50 w-full flex items-stretch z-[70];
		content: '';
		height: calc(100%);
		div {
			@apply border-r-[1px] border-gray-700;
			&:nth-child(2n + 1) {
				width: 7.9vw;
			}
			&:nth-child(2n) {
				width: 6.4vw;
			}
		}
	}
</style>
