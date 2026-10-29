<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '#lib/data/site.ts';
	import { currentFilms, formatDay, screeningsOf, today } from '#lib/programme.ts';
	import Poster from '#lib/components/Poster.svelte';
	import FilmCard from '#lib/components/FilmCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const film = $derived(data.film);

	let start = $state(today());
	onMount(() => {
		start = today();
	});

	// The next two weeks, grouped by day.
	const byDay = $derived.by(() => {
		const groups = new Map<string, string[]>();
		for (const s of screeningsOf(film, start)) {
			groups.set(s.date, [...(groups.get(s.date) ?? []), s.time]);
		}
		return [...groups];
	});
	const others = $derived(currentFilms(start).filter((f) => f.slug !== film.slug).slice(0, 4));
</script>

<svelte:head>
	<title>{film.title} ({film.year}) · {site.name}</title>
	<meta name="description" content={film.synopsis} />
	<link rel="canonical" href="{site.url}/films/{film.slug}/" />
	<meta property="og:title" content="{film.title} at {site.name}" />
	<meta property="og:description" content={film.synopsis} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Movie',
		name: film.title,
		dateCreated: String(film.year),
		director: { '@type': 'Person', name: film.director },
		countryOfOrigin: film.country,
		inLanguage: film.language,
		duration: `PT${film.runtime}M`,
		contentRating: film.certificate,
		description: film.synopsis
	})}</script>`}
</svelte:head>

<article class="section container film">
	<div class="poster-col">
		<Poster {film} size="large" />
	</div>
	<div class="info">
		<p class="eyebrow"><a href="/#whats-on">What’s on</a> · Screen {film.screen}</p>
		<h1>{film.title}</h1>
		<dl class="facts">
			<div><dt>Director</dt><dd>{film.director}</dd></div>
			<div><dt>Country</dt><dd>{film.country}, {film.year}</dd></div>
			<div><dt>Language</dt><dd>{film.language}</dd></div>
			<div><dt>Running time</dt><dd>{film.runtime} minutes</dd></div>
			<div><dt>Certificate</dt><dd>{film.certificate}</dd></div>
		</dl>
		{#if film.tags?.length}
			<p class="tags">
				{#each film.tags as tag (tag)}<span>{tag}</span>{/each}
			</p>
		{/if}
		<p class="synopsis">{film.synopsis}</p>

		<h2 class="when-title">When it’s on</h2>
		{#if byDay.length}
			<ul class="when">
				{#each byDay as [date, times] (date)}
					<li>
						<span class="day">{formatDay(date)}</span>
						<span class="times">{times.join('  ')}</span>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="muted">
				Not on in the next two weeks{film.run.from > start
					? ` — it opens on ${formatDay(film.run.from)}`
					: ''}.
			</p>
		{/if}
		<p class="book">
			Book at the box office or call <a href="tel:{site.phone.replaceAll(' ', '')}">{site.phone}</a>.
		</p>

		{#if film.trailer}
			<h2 class="media-title">Trailer</h2>
			<video class="media" controls preload="none" poster={film.trailer.poster} width="640" height="360">
				{#each film.trailer.sources as source (source.src)}
					<source src={source.src} type={source.type} />
				{/each}
				Your browser can’t play this trailer.
			</video>
		{/if}
		{#if film.interview}
			<h2 class="media-title">Interview</h2>
			<iframe
				class="media"
				src={film.interview.src}
				title={film.interview.title}
				loading="lazy"
				width="640"
				height="360"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		{/if}
	</div>
</article>

{#if others.length}
	<section class="section container more">
		<h2 class="section-title">Also at The Orrery</h2>
		<ul class="films">
			{#each others as other (other.slug)}
				<li><FilmCard film={other} /></li>
			{/each}
		</ul>
	</section>
{/if}

<style>
	.film {
		display: grid;
		grid-template-columns: minmax(0, 22rem) minmax(0, 1fr);
		gap: clamp(2rem, 5vw, 5rem);
		align-items: start;
	}
	.poster-col {
		position: sticky;
		top: 6rem;
	}
	.eyebrow a {
		color: inherit;
	}
	h1 {
		margin-top: 0.75rem;
		font-size: clamp(3rem, 8vw, 6.5rem);
	}
	.facts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
		gap: 1rem 2rem;
		margin: 2rem 0 0;
	}
	.facts dt {
		font: 700 0.75rem/1 var(--display);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--brass);
	}
	.facts dd {
		margin: 0.35rem 0 0;
	}
	.tags {
		display: flex;
		gap: 0.4rem;
		margin-top: 1.5rem;
	}
	.tags span {
		padding: 0.2rem 0.6rem;
		background: var(--velvet);
		font: 700 0.8125rem/1.3 var(--display);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.synopsis {
		margin-top: 2rem;
		font-size: clamp(1.125rem, 1.7vw, 1.375rem);
		line-height: 1.55;
		max-width: 38rem;
	}
	.when-title {
		margin-top: 3rem;
		font-size: 2rem;
	}
	.when {
		margin-top: 1rem;
		border-top: 1px solid var(--line);
	}
	.when li {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.75rem;
		border-bottom: 1px solid var(--line);
	}
	.times {
		font: 600 1.125rem/1.3 var(--mono);
		color: var(--brass);
		white-space: pre;
	}
	.muted {
		margin-top: 1rem;
		color: var(--muted);
	}
	.book {
		margin-top: 1.5rem;
		color: var(--muted);
	}
	.media-title {
		margin-top: 3rem;
		font-size: 2rem;
	}
	.media {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		margin-top: 1rem;
		border: 0;
		background: var(--smoke);
	}
	.more {
		padding-top: 0;
	}
	.films {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 12rem), 1fr));
		gap: 2rem 1.5rem;
		margin-top: 2rem;
	}
	@media (max-width: 40rem) {
		.films {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem 1rem;
		}
	}
	@media (max-width: 48rem) {
		.film {
			grid-template-columns: 1fr;
		}
		.poster-col {
			position: static;
			max-width: 16rem;
		}
	}
</style>
