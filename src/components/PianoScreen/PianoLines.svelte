<div class="lines">
	{#each Array(9).fill(0) as _}
		<div />
	{/each}
</div>

<style lang="scss">
	.lines {
		@apply absolute top-0 w-full flex items-stretch z-[70];
		content: '';
		height: calc(100%);
		div {
			@apply border-r-[1px] border-gray-900;
			&:nth-child(2n + 1) {
				width: 8.65vw;
			}
			&:nth-child(2n) {
				width: 10.77vw;
			}
		}
	}
</style>
