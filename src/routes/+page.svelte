<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '#lib/data/site.ts';
	import { regulars } from '#lib/data/events.ts';
	import { memberships } from '#lib/data/memberships.ts';
	import {
		addDays,
		comingSoon,
		formatDay,
		nowShowing,
		screeningsOn,
		today
	} from '#lib/programme.ts';
	import Photo from '#lib/components/Photo.svelte';
	import FilmCard from '#lib/components/FilmCard.svelte';
	import ScreeningList from '#lib/components/ScreeningList.svelte';

	// The page is built with the build day's programme; in the browser it
	// moves on to the visitor's today, so an older build still shows the
	// right week.
	let start = $state(today());
	const days = $derived(Array.from({ length: 7 }, (_, i) => addDays(start, i)));

	// Opens on the first day with a film (the cinema is closed on Mondays).
	function firstDayWithFilms(): number {
		return Math.max(0, days.findIndex((day) => screeningsOn(day).length > 0));
	}
	let chosen = $state(0);
	chosen = firstDayWithFilms();
	onMount(() => {
		start = today();
		chosen = firstDayWithFilms();
	});

	const screenings = $derived(screeningsOn(days[chosen]));
	const showing = $derived(nowShowing(start));
	const soon = $derived(comingSoon(start));
	const cheapest = memberships[0];
</script>

<svelte:head>
	<title>{site.name} — independent cinema in {site.address.town}</title>
	<meta
		name="description"
		content="Two-screen independent cinema in the old corn exchange in Halwick: new independent and international films, classics on 35mm, kids’ club and silent films with live piano."
	/>
	<link rel="canonical" href="{site.url}/" />
	<meta property="og:title" content={site.name} />
	<meta property="og:description" content={site.tagline} />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'MovieTheater',
		name: site.name,
		url: site.url,
		telephone: site.phone,
		email: site.email,
		screenCount: 2,
		address: {
			'@type': 'PostalAddress',
			streetAddress: `${site.address.building}, ${site.address.street}`,
			addressLocality: site.address.town,
			addressCountry: 'GB'
		}
	})}</script>`}
</svelte:head>

<section class="hero">
	<Photo name="hero-auditorium" eager class="hero-photo" />
	<div class="container hero-text">
		<p class="eyebrow">Independent cinema · Halwick · since 2011</p>
		<h1>{site.name}</h1>
		<p class="lead">{site.tagline}</p>
		<p class="actions">
			<a class="button" href="#whats-on">What’s on this week</a>
			<a class="button button-ghost" href="tel:{site.phone.replaceAll(' ', '')}">Book {site.phone}</a>
		</p>
	</div>
</section>

<section id="whats-on" class="section container">
	<p class="eyebrow">What’s on</p>
	<h2 class="section-title">This week</h2>
	<div class="days" role="tablist" aria-label="Choose a day">
		{#each days as day, i (day)}
			<button
				type="button"
				role="tab"
				aria-selected={chosen === i}
				class:active={chosen === i}
				onclick={() => (chosen = i)}
			>
				<span class="dow">{i === 0 ? 'Today' : formatDay(day, 'short').split(' ')[0]}</span>
				<span class="date">{formatDay(day, 'short').split(' ').slice(1).join(' ')}</span>
			</button>
		{/each}
	</div>
	<h3 class="day-heading">{formatDay(days[chosen])}</h3>
	<ScreeningList {screenings} />
	<p class="note">
		Tickets at the box office or on {site.phone}; see <a href="/visit/">all prices</a>.
	</p>
</section>

<section class="section container">
	<p class="eyebrow">Now showing</p>
	<h2 class="section-title">On our screens</h2>
	<ul class="films">
		{#each showing as film (film.slug)}
			<li><FilmCard {film} /></li>
		{/each}
	</ul>
</section>

{#if soon.length}
	<section class="section container soon">
		<p class="eyebrow">Coming soon</p>
		<h2 class="section-title">Still to come</h2>
		<ul class="films">
			{#each soon as film (film.slug)}
				<li><FilmCard {film} note="From {formatDay(film.run.from)}" /></li>
			{/each}
		</ul>
	</section>
{/if}

<section class="section regulars-wrap">
	<div class="container">
		<p class="eyebrow">Every week, every month</p>
		<h2 class="section-title">The regulars</h2>
		<ul class="regulars">
			{#each regulars as regular (regular.title)}
				<li class="regular" class:with-photo={regular.image}>
					{#if regular.image}
						<Photo name={regular.image} sizes="(min-width: 60rem) 36rem, 100vw" />
					{/if}
					<div>
						<p class="when">{regular.when}</p>
						<h3>{regular.title}</h3>
						<p>{regular.text}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<section class="member">
	<div class="container member-inner">
		<div>
			<p class="eyebrow">Membership</p>
			<h2 class="section-title">Keep the projector running</h2>
		</div>
		<div>
			<p class="lead">
				From {`£${cheapest.price}`} a year: £8 tickets for every film, the programme a week early, and the
				knowledge that a 1958 projector keeps turning because of you.
			</p>
			<a class="button" href="/membership/">See membership</a>
		</div>
	</div>
</section>

<section class="section container visit">
	<Photo name="facade-night" sizes="(min-width: 60rem) 40rem, 100vw" class="visit-photo" />
	<div>
		<p class="eyebrow">Visit</p>
		<h2 class="section-title">On Market Hill</h2>
		<p class="lead">
			In the old corn exchange, two minutes from the bus station. Step-free to both screens, with a
			hearing loop and a café-bar that opens an hour before the first film.
		</p>
		<dl class="hours">
			{#each site.boxOffice as row (row.days)}
				<div><dt>{row.days}</dt><dd>{row.hours}</dd></div>
			{/each}
		</dl>
		<a class="button button-ghost" href="/visit/">Prices, access, getting here</a>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		min-height: min(88svh, 52rem);
		align-items: end;
		overflow: hidden;
	}
	.hero :global(.hero-photo) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, var(--night) 8%, rgb(18 16 20 / 0.55) 55%, rgb(18 16 20 / 0.2));
	}
	.hero-text {
		position: relative;
		z-index: 1;
		padding-block: 4rem clamp(3rem, 7vw, 5rem);
	}
	.hero h1 {
		margin-top: 0.75rem;
		font-size: clamp(4.5rem, 16vw, 13rem);
		font-weight: 900;
		line-height: 0.82;
	}
	.hero .lead {
		margin-top: 1.25rem;
		color: var(--screen);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 2rem;
	}
	.days {
		display: flex;
		gap: 0.5rem;
		margin-top: 2rem;
		overflow-x: auto;
		padding-bottom: 0.25rem;
	}
	.days button {
		display: grid;
		gap: 0.2rem;
		min-width: 5.5rem;
		padding: 0.7rem 0.9rem;
		border: 1px solid var(--line);
		background: transparent;
		color: var(--screen);
		cursor: pointer;
		text-align: left;
	}
	.days button:hover {
		border-color: var(--brass);
	}
	.days button.active {
		background: var(--brass);
		border-color: var(--brass);
		color: var(--night);
	}
	.dow {
		font: 800 1.25rem/1 var(--display);
		text-transform: uppercase;
	}
	.date {
		font: 500 0.8125rem/1 var(--mono);
	}
	.day-heading {
		margin: 2rem 0 0.75rem;
		font-size: 1.25rem;
		letter-spacing: 0.12em;
		color: var(--muted);
	}
	.note {
		margin-top: 1.25rem;
		font-size: 0.9375rem;
		color: var(--muted);
	}
	.films {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 13rem), 1fr));
		gap: 2rem 1.5rem;
		margin-top: 2.5rem;
	}
	.soon {
		padding-top: 0;
	}
	.regulars-wrap {
		background: var(--smoke);
	}
	.regulars {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.5rem;
		margin-top: 2.5rem;
	}
	.regular {
		display: grid;
		align-content: start;
		gap: 1.25rem;
		padding: 1.5rem;
		border: 1px solid var(--line);
	}
	.regular.with-photo {
		grid-row: span 2;
	}
	.regular :global(img) {
		width: 100%;
		aspect-ratio: 3 / 2;
		object-fit: cover;
	}
	.regular h3 {
		margin-top: 0.4rem;
		font-size: 2rem;
	}
	.regular p:last-child {
		margin-top: 0.6rem;
		color: var(--muted);
	}
	.when {
		font: 600 0.875rem/1.3 var(--mono);
		color: var(--brass);
	}
	.member {
		background: var(--velvet);
		padding-block: clamp(3rem, 7vw, 5rem);
	}
	.member .eyebrow {
		color: var(--screen);
	}
	.member-inner {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem 4rem;
		align-items: end;
	}
	.member .lead {
		color: var(--screen);
		margin-bottom: 1.5rem;
	}
	.member .button {
		background: var(--screen);
		border-color: var(--screen);
	}
	.member .button:hover {
		background: transparent;
		color: var(--screen);
	}
	.visit {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem 4rem;
		align-items: center;
	}
	.visit :global(.visit-photo) {
		width: 100%;
		aspect-ratio: 3 / 2;
		object-fit: cover;
	}
	.visit .lead {
		margin-top: 1rem;
	}
	.hours {
		margin: 1.5rem 0 2rem;
	}
	.hours div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.5rem;
		border-bottom: 1px solid var(--line);
	}
	.hours dd {
		margin: 0;
		color: var(--muted);
		text-align: right;
	}
	@media (max-width: 40rem) {
		.films {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem 1rem;
		}
	}
	@media (max-width: 52rem) {
		.regulars,
		.member-inner,
		.visit {
			grid-template-columns: 1fr;
		}
		.regular.with-photo {
			grid-row: auto;
		}
	}
</style>
