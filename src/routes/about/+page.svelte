<script lang="ts">
	import { site } from '#lib/data/site.ts';
	import Photo from '#lib/components/Photo.svelte';
</script>

<svelte:head>
	<title>About · {site.name}</title>
	<meta name="description" content="The Orrery: a two-screen cinema in Halwick’s 1930s corn exchange, run by a charitable trust, with a 35mm projector still in use." />
	<link rel="canonical" href="{site.url}/about/" />
</svelte:head>

<section class="section container">
	<p class="eyebrow">About</p>
	<h1 class="title">A cinema under a painted sky</h1>
</section>

<section class="container story">
	<Photo name="audience" sizes="100vw" class="wide" />
	<div class="columns">
		<div>
			<h2>The building</h2>
			<p>
				Halwick’s corn exchange was built in 1934, when the market still traded grain by the sack. Its
				dome was painted with the planets turning round the sun — an orrery — so that the farmers had
				something to look at while they haggled. When the trading stopped in 1971 the hall stood
				empty for forty years.
			</p>
		</div>
		<div>
			<h2>The trust</h2>
			<p>
				In 2011 a group of neighbours, two retired projectionists and a very patient bank manager set
				up the Orrery Trust, bought the lease for a pound and opened Screen 1 under the restored dome.
				Screen 2, a fifty-seat room in the old weighing office, followed in 2017. The trust is a
				registered charity; everything we earn goes back into the cinema.
			</p>
		</div>
	</div>
</section>

<section class="section container booth">
	<div>
		<h2 class="section-title">The booth</h2>
		<p class="lead">
			Screen 1 has a digital projector like every cinema, and a 1958 35mm projector that came from a
			cinema in Leeds when it closed. Our volunteers keep it running; about one film a week is
			shown on it, and every silent film. You can hear it ticking from the back row.
		</p>
	</div>
	<Photo name="film-cans" sizes="(min-width: 60rem) 30rem, 100vw" class="booth-photo" />
	<Photo name="screen-two" sizes="(min-width: 60rem) 30rem, 100vw" class="booth-photo" />
</section>

<style>
	.title {
		margin-top: 0.75rem;
		font-size: clamp(3rem, 9vw, 7.5rem);
		max-width: 14ch;
	}
	.story :global(.wide) {
		width: 100%;
		aspect-ratio: 21 / 9;
		object-fit: cover;
	}
	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem 4rem;
		margin-top: 3rem;
	}
	.columns h2 {
		font-size: 2.25rem;
		margin-bottom: 1rem;
	}
	.columns p {
		color: var(--muted);
	}
	.booth {
		display: grid;
		grid-template-columns: 1.2fr 1fr 1fr;
		gap: 1.5rem;
		align-items: end;
	}
	.booth .lead {
		margin-top: 1rem;
	}
	.booth :global(.booth-photo) {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
	}
	@media (max-width: 52rem) {
		.columns,
		.booth {
			grid-template-columns: 1fr;
		}
	}
</style>
