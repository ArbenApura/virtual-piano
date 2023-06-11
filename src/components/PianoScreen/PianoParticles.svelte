<script lang="ts">
	// IMPORTED TYPES
	import type { Particle } from '$stores/particleStates';
	// LIB-UTILS
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	// UTILS
	import { particles, PARTICLE_SIZE } from '$stores/particleStates';

	// REFS
	let canvasEl: HTMLCanvasElement;

	// LIFECYCLES
	onMount(() => {
		if (!canvasEl) return;
		canvasEl.width = canvasEl.clientWidth;
		canvasEl.height = canvasEl.clientHeight;
		const ctx = canvasEl.getContext('2d');
		const render = () => {
			if (!canvasEl || !ctx) return;
			ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
			let nparticles: Particle[] = [];
			for (let particle of get(particles)) {
				if (particle.y <= 265 || particle.opacity <= 0) continue;
				particle.y -= particle.velocity;
				particle.velocity += particle.velocity / 32 / 2;
				particle.opacity -= 0.02 / 2;
				ctx.fillStyle =
					particle.color === 'white'
						? `rgba(255, 255, 255, ${particle.opacity})`
						: `rgba(0, 0, 0, ${particle.opacity})`;
				ctx.fillRect(particle.x, particle.y, PARTICLE_SIZE, PARTICLE_SIZE);
				nparticles.push(particle);
			}
			requestAnimationFrame(render);
		};
		requestAnimationFrame(render);
	});
</script>

<canvas bind:this={canvasEl} />

<style lang="scss">
	canvas {
		@apply absolute top-0 w-full h-full z-[1000];
	}
</style>
