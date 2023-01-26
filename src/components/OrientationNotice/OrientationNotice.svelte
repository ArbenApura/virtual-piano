<script lang="ts">
	// IMPORTED LIB-UTILS
	import { fade } from 'svelte/transition';
	// IMPORTED UTILS
	import { orientation } from '$stores/settingsStates';

	// STATES
	let isOpen = false;

	// REACTIVE STATEMENTS
	$: $orientation && (isOpen = $orientation === 'portrait');
</script>

{#if isOpen}
	<button class="notice" in:fade out:fade on:click={() => (isOpen = false)}>
		<div class="content">
			<svg
				version="1.1"
				viewBox="0 0 32 32"
				xml:space="preserve"
				width="100px"
				height="100px"
			>
				<g id="SVGRepo_bgCarrier" stroke-width="0" />
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
				<g id="SVGRepo_iconCarrier">
					<path
						class="st0"
						d="M3,27V17c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2v10c0,1.1-0.9,2-2,2H5C3.9,29,3,28.1,3,27z"
					/> <line class="st0" x1="25" y1="15" x2="25" y2="29" />
					<line class="st0" x1="9" y1="15" x2="9" y2="29" />
					<line class="st0" x1="6" y1="21" x2="6" y2="23" />
					<path class="st0" d="M3,17V5c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v7" />
					<line class="st0" x1="3" y1="7" x2="17" y2="7" />
					<path class="st0" d="M20,4.1c3.4,0.5,6,3.4,6,6.9l3-4" />
				</g>
			</svg>
			<h4>Please rotate your device</h4>
			<p>This page is best viewed in landscape orientation</p>
		</div>
	</button>
{/if}

<slot />

<style lang="scss">
	@import '$styles';
	.notice {
		@apply bg-gray-900 text-slate-50 fixed w-full h-full top-0 left-0 z-[1000];
		@include flex-center;
		.content {
			@apply flex flex-col items-center px-2;
			svg {
				.st0 {
					fill: none;
					stroke: #f8fafc;
					stroke-width: 1;
					stroke-linecap: round;
					stroke-linejoin: round;
					stroke-miterlimit: 10;
				}
				.st1 {
					fill: none;
					stroke: #f8fafc;
					stroke-width: 1;
					stroke-linejoin: round;
					stroke-miterlimit: 10;
				}
			}
			h4 {
				@apply mt-4;
			}
			p {
				@apply text-[10px] text-gray-500;
			}
		}
	}
</style>
