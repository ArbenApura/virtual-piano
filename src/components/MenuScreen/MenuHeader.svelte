<script lang="ts">
	// IMPORTED UTILS
	import { isFullScreen, toggleIsFullScreen } from '$stores/settingsStates';
	import { toggleIsPlaying } from '$stores/playerStates';
	import {
		isOpen,
		currentTab,
		closeMenu,
		openSettings,
		openScores,
		openAbout,
	} from '$stores/menuStates';

	// STATES
	$: entries = [
		{
			name: 'fullscreen',
			icon: `ti ti-${$isFullScreen ? 'minimize' : 'maximize'}`,
			onClick: toggleIsFullScreen,
		},
		{ name: 'about', icon: 'ti ti-info-circle', onClick: openAbout },
		{ name: 'scores', icon: 'ti ti-vinyl', onClick: openScores },
		{ name: 'settings', icon: 'ti ti-settings-2', onClick: openSettings },
	];
</script>

<div class="header" data-is-open={$isOpen}>
	{#if $isOpen}
		<div class="heading">
			{#each entries as entry}
				{#if entry.name === $currentTab}
					<i class={entry.icon} />
					<p>{entry.name}</p>
				{/if}
			{/each}
		</div>
	{:else}
		<button class="brand" on:dblclick={toggleIsPlaying}>
			<img src="piano.svg" alt="logo" />
			<p>Virtual Piano</p>
		</button>
	{/if}
	<div class="btn-group">
		{#each entries as entry}
			{#if entry.name === $currentTab}
				<button on:click={closeMenu}>
					<i class="ti ti-x" />
				</button>
			{:else}
				<button on:click={entry.onClick}>
					<i class={entry.icon} />
				</button>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@import '$styles';
	.header {
		@apply p-3;
		@include flex-start-center;
		&[data-is-open='true'] {
			@apply bg-gray-900 border-b border-gray-800;
		}
		.brand {
			@apply flex-grow gap-2;
			@include flex-start-center;
			img {
				@apply w-[30px];
			}
		}
		.heading {
			@apply flex-grow gap-2 capitalize;
			@include flex-start-center;
			i {
				@apply text-[30px];
			}
		}
		.btn-group {
			@apply gap-3;
			@include flex-center;
			button {
				@include flex-center;
				i {
					@apply text-[25px];
				}
				&:hover {
					@apply opacity-75;
				}
			}
		}
	}
</style>
