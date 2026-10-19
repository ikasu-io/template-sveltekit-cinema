<script lang="ts">
	import { pounds, site } from '#lib/data/site.ts';
	import { membershipFaq, memberships } from '#lib/data/memberships.ts';
	import Photo from '#lib/components/Photo.svelte';
</script>

<svelte:head>
	<title>Membership · {site.name}</title>
	<meta name="description" content="Become a member of The Orrery: cheaper tickets, early booking, and a 35mm projector that keeps running." />
	<link rel="canonical" href="{site.url}/membership/" />
</svelte:head>

<section class="section container intro">
	<div>
		<p class="eyebrow">Membership</p>
		<h1 class="section-title">Keep the projector running</h1>
		<p class="lead">
			The Orrery is run by a charitable trust. Members pay for the things a cinema this size couldn’t
			otherwise do: films on 35mm, relaxed screenings, the schools programme. In return: cheaper
			tickets and first pick of the seats.
		</p>
	</div>
	<Photo name="projector" sizes="(min-width: 60rem) 24rem, 100vw" class="intro-photo" />
</section>

<section class="container levels">
	{#each memberships as level (level.name)}
		<article class="level" class:highlight={level.highlight}>
			{#if level.highlight}<p class="badge">Most chosen</p>{/if}
			<h2>{level.name}</h2>
			<p class="price">{pounds(level.price)}<span> a year</span></p>
			<ul>
				{#each level.perks as perk (perk)}
					<li>{perk}</li>
				{/each}
			</ul>
			<a class="button" class:button-ghost={!level.highlight} href="mailto:{site.email}?subject={encodeURIComponent(`Membership: ${level.name}`)}">
				Join as {level.name}
			</a>
		</article>
	{/each}
</section>

<section class="section container faq">
	<h2 class="section-title">Questions</h2>
	{#each membershipFaq as item (item.q)}
		<details>
			<summary>{item.q}</summary>
			<p>{item.a}</p>
		</details>
	{/each}
</section>

<style>
	.intro {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 2rem 4rem;
		align-items: center;
	}
	.intro .lead {
		margin-top: 1rem;
	}
	.intro :global(.intro-photo) {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
	}
	.levels {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.5rem;
	}
	.level {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem 1.5rem;
		border: 1px solid var(--line);
		background: var(--smoke);
	}
	.level.highlight {
		background: var(--velvet);
		border-color: var(--velvet);
	}
	.badge {
		font: 700 0.75rem/1 var(--display);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--brass);
	}
	.level h2 {
		font-size: 2.5rem;
	}
	.price {
		font: 600 2rem/1 var(--mono);
		color: var(--brass);
	}
	.level.highlight .price,
	.level.highlight .badge {
		color: var(--screen);
	}
	.price span {
		font: 400 0.9375rem/1 var(--body);
		color: var(--muted);
	}
	.level.highlight .price span {
		color: var(--screen);
	}
	.level ul {
		display: grid;
		gap: 0.5rem;
		flex: 1;
	}
	.level li {
		padding-left: 1.4rem;
		position: relative;
	}
	.level li::before {
		content: '✦';
		position: absolute;
		left: 0;
		color: var(--brass);
	}
	.level .button {
		align-self: start;
	}
	.faq details {
		border-bottom: 1px solid var(--line);
		padding-block: 1rem;
	}
	.faq summary {
		cursor: pointer;
		font: 800 1.5rem/1.1 var(--display);
		text-transform: uppercase;
	}
	.faq summary:first-of-type {
		margin-top: 0;
	}
	.faq h2 {
		margin-bottom: 1.5rem;
	}
	.faq p {
		margin-top: 0.75rem;
		color: var(--muted);
		max-width: 40rem;
	}
	@media (max-width: 52rem) {
		.intro,
		.levels {
			grid-template-columns: 1fr;
		}
	}
</style>
