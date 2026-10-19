<script lang="ts">
	import { pounds, site } from '#lib/data/site.ts';
	import { regulars } from '#lib/data/events.ts';
	import Photo from '#lib/components/Photo.svelte';
</script>

<svelte:head>
	<title>Visit · {site.name}</title>
	<meta name="description" content="Ticket prices, access, the café-bar and how to get to The Orrery in Halwick." />
	<link rel="canonical" href="{site.url}/visit/" />
</svelte:head>

<section class="section container">
	<p class="eyebrow">Visit</p>
	<h1 class="section-title">Prices, access, the bar</h1>

	<div class="grid">
		<div class="block">
			<h2>Tickets</h2>
			<table>
				<tbody>
					{#each site.prices as row (row.label)}
						<tr><th scope="row">{row.label}</th><td>{pounds(row.price)}</td></tr>
					{/each}
				</tbody>
			</table>
			<p class="small">
				Book at the box office, by phone on {site.phone} or by email. We hold phoned bookings until
				ten minutes before the film.
			</p>
		</div>

		<div class="block">
			<h2>Box office</h2>
			<dl>
				{#each site.boxOffice as row (row.days)}
					<div><dt>{row.days}</dt><dd>{row.hours}</dd></div>
				{/each}
			</dl>
			<h2 class="second">Access</h2>
			<ul class="list">
				<li>Step-free from the street to both screens, with a lift to Screen 2.</li>
				<li>Wheelchair spaces in both screens, and a free ticket for a companion.</li>
				<li>Hearing loop in Screen 1; subtitled screenings marked in the programme.</li>
				<li>
					{regulars.find((r) => r.title === 'Relaxed screenings')?.when}: relaxed screenings, lights
					half up, softer sound.
				</li>
			</ul>
		</div>
	</div>
</section>

<section class="bar">
	<Photo name="foyer-bar" sizes="(min-width: 60rem) 50vw, 100vw" class="bar-photo" />
	<div class="bar-text">
		<p class="eyebrow">The café-bar</p>
		<h2 class="section-title">An hour before the first film</h2>
		<p class="lead">
			Local beer from Halwick Brewery on tap, wine by the glass, good coffee and cake from the
			market. Take your drink into the screen — we ask only that it’s not crisps during the silent
			film.
		</p>
	</div>
</section>

<section class="section container getting">
	<div>
		<p class="eyebrow">Getting here</p>
		<h2 class="section-title">Market Hill</h2>
		<p class="lead">
			{site.address.building}, {site.address.street}, {site.address.town}. Two minutes from the bus
			station; the 14 and the 22 stop outside until 23:30. Short-stay car park on Wool Lane, free
			after 18:00. Bike racks under the colonnade.
		</p>
	</div>
	<Photo name="facade-night" sizes="(min-width: 60rem) 36rem, 100vw" class="getting-photo" />
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2.5rem;
	}
	.block {
		padding: clamp(1.25rem, 3vw, 2rem);
		background: var(--smoke);
	}
	h2 {
		font-size: 1.875rem;
	}
	.second {
		margin-top: 2rem;
	}
	table {
		width: 100%;
		margin-top: 1rem;
		border-collapse: collapse;
	}
	th,
	td {
		padding: 0.7rem 0;
		border-bottom: 1px solid var(--line);
		text-align: left;
		font-weight: 400;
	}
	td {
		text-align: right;
		font: 600 1.125rem/1 var(--mono);
		color: var(--brass);
	}
	.small {
		margin-top: 1rem;
		font-size: 0.9375rem;
		color: var(--muted);
	}
	dl {
		margin: 1rem 0 0;
	}
	dl div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: 0.55rem;
		border-bottom: 1px solid var(--line);
	}
	dd {
		margin: 0;
		color: var(--muted);
		text-align: right;
	}
	.list {
		display: grid;
		gap: 0.6rem;
		margin-top: 1rem;
	}
	.list li {
		padding-left: 1.25rem;
		position: relative;
	}
	.list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.65em;
		width: 0.5rem;
		height: 0.5rem;
		background: var(--brass);
		border-radius: 50%;
	}
	.bar {
		display: grid;
		grid-template-columns: 1fr 1fr;
		background: var(--velvet);
	}
	.bar :global(.bar-photo) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		min-height: 22rem;
	}
	.bar-text {
		padding: clamp(2rem, 6vw, 5rem) var(--gutter);
		align-self: center;
	}
	.bar .eyebrow,
	.bar .lead {
		color: var(--screen);
	}
	.bar .lead {
		margin-top: 1rem;
	}
	.getting {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem 4rem;
		align-items: center;
	}
	.getting .lead {
		margin-top: 1rem;
	}
	.getting :global(.getting-photo) {
		width: 100%;
		aspect-ratio: 3 / 2;
		object-fit: cover;
	}
	@media (max-width: 52rem) {
		.grid,
		.bar,
		.getting {
			grid-template-columns: 1fr;
		}
	}
</style>
