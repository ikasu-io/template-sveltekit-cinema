<script lang="ts">
	import type { Film } from '#lib/data/films.ts';
	import Poster from './Poster.svelte';

	let { film, note = '' }: { film: Film; note?: string } = $props();
</script>

<a class="card" href="/films/{film.slug}/">
	<Poster {film} />
	<span class="meta">
		<span class="title">{film.title}</span>
		<span class="facts">{film.country} · {film.runtime} min · {film.certificate}</span>
		{#if note}<span class="note">{note}</span>{/if}
	</span>
</a>

<style>
	.card {
		display: grid;
		gap: 0.75rem;
		color: var(--screen);
		text-decoration: none;
	}
	.card :global(.poster) {
		transition: transform 0.25s;
	}
	.card:hover :global(.poster) {
		transform: translateY(-4px);
	}
	.meta {
		display: grid;
		gap: 0.2rem;
	}
	.title {
		font: 800 1.375rem/1 var(--display);
		text-transform: uppercase;
	}
	.facts {
		font-size: 0.875rem;
		color: var(--muted);
	}
	.note {
		font: 700 0.875rem/1.3 var(--display);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--brass);
	}
</style>
