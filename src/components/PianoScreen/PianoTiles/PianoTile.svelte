<script lang="ts">
	// IMPORTED TYPES
	import type { NoteState } from '$stores/pianoStates';
	// IMPORTED LIB-UTILS
	import { get } from 'svelte/store';
	// IMPORTED UTILS
	import { getRandomInt } from '$utils/helpers';

	// PROPS
	export let note: NoteState;

	// STATES
	const { isPressing, boundaries, type } = note;

	// REFS
	let particlesTile: HTMLDivElement;

	// REACTIVE STATES
	$: boundary = (type === 'white' ? $boundaries[1] : $boundaries[0]) || { x: 0, width: 0 };

	// REACTIVE STATEMEMENTS
	$: $isPressing && generateParticles();

	// UTILS
	const generateParticles = () => {
		if (!particlesTile || !get(isPressing)) return;
		for (let i = 0; i < 10; i++) {
			const particle = document.createElement('div');
			particle.setAttribute('class', 'particle');
			particle.setAttribute('data-type', type);
			particle.style.left = getRandomInt(0, boundary.width - 4) + 'px';
			particle.style.bottom = getRandomInt(-100, 0) + 'px';
			particle.style.animationDelay = getRandomInt(0, 200) + 'ms';
			particle.style.backgroundColor = type;
			particlesTile.appendChild(particle);
			setTimeout(() => particlesTile.removeChild(particle), 5000);
		}
		setTimeout(generateParticles, 500);
	};
</script>

<div
	bind:this={particlesTile}
	class="particles-tile"
	style="width: {boundary.width}px; left: {boundary.x}px"
/>
<div
	class="highlight-tile {type}-tile"
	style="width: {boundary.width}px; left: {boundary.x}px"
	data-is-active={$isPressing}
/>
<div
	class="dot-tile"
	style="width: {boundary.width}px; left: {boundary.x}px"
	data-is-active={$isPressing}
>
	<span class="dot {type}-dot" />
	<span class="dot {type}-dot" />
</div>

<style lang="scss">
	.particles-tile {
		@apply absolute top-0 h-full;
	}
	:global(.particle) {
		@keyframes float {
			from {
				transform: translateY(0px);
				opacity: 1;
			}
			to {
				transform: translateY(-300px);
				opacity: 0;
			}
		}
		@apply absolute bottom-[-10px] w-[4px] h-[4px] rounded-full z-[1200];
		animation: float forwards 4s ease;
	}
	.dot-tile,
	.highlight-tile {
		@apply absolute top-0 h-full opacity-0;
	}
	.highlight-tile {
		&::before,
		&::after {
			@apply absolute w-full h-full opacity-0;
			content: '';
		}
		&::before {
			@apply bg-slate-50 bg-opacity-40 opacity-75 z-20;
			background-image: linear-gradient(
				to top,
				transparent,
				rgba(255, 255, 255, 0.2),
				rgba(255, 255, 255, 0.4),
				rgba(255, 255, 255, 0.6),
				rgba(255, 255, 255, 0.8),
				#f8fafc
			);
		}
		&::after {
			@apply bg-fixed opacity-100 z-10;
			background-image: var(--bg-image);
			background-position: var(--bg-position);
			background-position-x: var(--bg-position-x);
			background-position-y: var(--bg-position-y);
			background-size: var(--bg-size);
		}
		&[data-is-active='true'] {
			@apply opacity-100;
			&::before {
				@apply bg-transparent;
				transition: background-color 1.5s;
			}
		}
	}
	.dot-tile {
		@apply flex flex-col justify-between items-center py-[.4vw] z-[60];
		.dot {
			@apply w-[.8vw] h-[.4vw] rounded-full;
			&.white-dot {
				@apply bg-slate-50;
			}
			&.black-dot {
				@apply bg-[#000];
			}
		}
		&[data-is-active='true'] {
			@apply opacity-100;
		}
	}
</style>
