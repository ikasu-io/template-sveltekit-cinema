<script lang="ts">
	import type { Film } from '#lib/data/films.ts';

	// A film poster drawn from the film's title and colour — no images of
	// films, so nothing to license and nothing to fake.
	let { film, size = 'small' }: { film: Film; size?: 'small' | 'large' } = $props();

	// Dark text on light posters, light text on dark ones.
	function isLight(hex: string): boolean {
		const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
		return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.5;
	}
</script>

<div
	class="poster {size}"
	class:light={isLight(film.colour)}
	style:--poster={film.colour}
	aria-hidden="true"
>
	<svg class="orbit" viewBox="0 0 200 300" preserveAspectRatio="none">
		<ellipse cx="100" cy="120" rx="140" ry="52" transform="rotate(-18 100 120)" />
		<circle cx="168" cy="72" r="7" />
	</svg>
	<span class="cert">{film.certificate}</span>
	<span class="title">{film.title}</span>
	<span class="credit">{film.director} · {film.year}</span>
</div>

<style>
	.poster {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		aspect-ratio: 2 / 3;
		padding: 8%;
		overflow: hidden;
		background:
			radial-gradient(circle at 80% 15%, rgb(255 255 255 / 0.18), transparent 45%),
			linear-gradient(160deg, var(--poster), color-mix(in oklab, var(--poster) 55%, black));
		color: var(--screen);
		container-type: inline-size;
	}
	.poster.light {
		color: var(--night);
	}
	.orbit {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		fill: none;
		stroke: currentColor;
		stroke-width: 1;
		opacity: 0.35;
	}
	.orbit circle {
		fill: currentColor;
	}
	.cert {
		position: absolute;
		top: 6%;
		left: 8%;
		display: grid;
		place-items: center;
		width: 2.2em;
		height: 2.2em;
		border: 1.5px solid currentColor;
		border-radius: 50%;
		font: 800 clamp(0.7rem, 7cqi, 1.1rem) / 1 var(--display);
	}
	.title {
		position: relative;
		font: 900 clamp(1.4rem, 17cqi, 4.5rem) / 0.88 var(--display);
		text-transform: uppercase;
		letter-spacing: 0.01em;
		overflow-wrap: anywhere;
		hyphens: auto;
	}
	.credit {
		position: relative;
		margin-top: 0.6em;
		font: 600 clamp(0.65rem, 5cqi, 0.95rem) / 1.2 var(--display);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.85;
	}
</style>
