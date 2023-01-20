<script lang="ts">
	// IMPORTED TYPES
	import type { Note } from '$stores/pianoStates';
	// IMPORTED UTILS
	import { noteList } from '$stores/pianoStates';

	// PROPS
	export let key: string, y: number;

	// STATES
	const gap = 3;
	const intensity = 0.4;
	const note = noteList[key as Note];
	const { isPressing, boundaries } = note;

	// REACTIVE STATES
	$: ly = note.type === 'white' ? y + gap : y - gap;
	$: [boundary] = $boundaries;
	$: [pl, pm, pr] = (() => {
		let pl = [0, 0],
			pm = [0, 0],
			pr = [0, 0];
		if (!boundary) return [pl, pm, pr];
		pl = [boundary.x, ly];
		pm = [
			boundary.x + boundary.width / 2,
			$isPressing ? ly * (note.type === 'white' ? 1 + intensity : 0.9 - intensity) : ly,
		];
		pr = [boundary.x + boundary.width, ly];
		return [pl, pm, pr];
	})();
	$: [fpl, fpr] = (() => {
		let fpl = [0, 0],
			fpr = [0, 0];
		if ($boundaries.length !== 2) return [fpl, fpr];
		fpl = [$boundaries[1].x, y - gap];
		fpr = [$boundaries[1].x + $boundaries[1].width, y - gap];
		return [fpl, fpr];
	})();
</script>

{#if $boundaries.length === 2}
	<line class="black-line" x1={fpl[0]} y1={fpl[1]} x2={fpr[0]} y2={fpr[1]} />
{/if}

<line class="{note.type}-line" x1={pl[0]} y1={pl[1]} x2={pm[0]} y2={pm[1]} />
<line class="{note.type}-line" x1={pm[0]} y1={pm[1]} x2={pr[0]} y2={pr[1]} />

<style lang="scss">
	.white-line {
		stroke: theme('colors.slate.50');
	}
	.black-line {
		stroke: #000;
		stroke-dasharray: 5;
		animation: dash 1s linear infinite;
	}

	@keyframes dash {
		to {
			stroke-dashoffset: -10;
		}
	}
</style>
