<script lang="ts">
	import type { Screening } from '#lib/programme.ts';

	// One day's screenings as a listings board: time, title, screen, tags.
	let { screenings, showDate = false }: { screenings: Screening[]; showDate?: boolean } = $props();
</script>

{#if screenings.length}
	<ol class="board">
		{#each screenings as s (s.film.slug + s.date + s.time)}
			<li class="row">
				<span class="time">{s.time}</span>
				<span class="what">
					<a href="/films/{s.film.slug}/">{s.film.title}</a>
					<span class="cert">{s.film.certificate}</span>
				</span>
				<span class="where">Screen {s.film.screen} · {s.film.runtime} min</span>
				<span class="tags">
					{#each s.tags as tag (tag)}
						<span class="tag">{tag}</span>
					{/each}
				</span>
			</li>
		{/each}
	</ol>
{:else}
	<p class="empty">No screenings this day{showDate ? '' : ' — the cinema is closed on Mondays'}.</p>
{/if}

<style>
	.board {
		border-top: 1px solid var(--line);
	}
	.row {
		display: grid;
		grid-template-columns: 5.5rem minmax(0, 1fr) auto auto;
		align-items: baseline;
		gap: 0.5rem 1.5rem;
		padding-block: 1rem;
		border-bottom: 1px solid var(--line);
	}
	.time {
		font: 600 1.375rem/1 var(--mono);
		color: var(--brass);
	}
	.what {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		min-width: 0;
	}
	.what a {
		color: var(--screen);
		text-decoration: none;
		font: 800 clamp(1.375rem, 2.6vw, 1.875rem) / 1 var(--display);
		text-transform: uppercase;
	}
	.what a:hover {
		color: var(--brass);
	}
	.cert {
		font: 700 0.8125rem/1 var(--display);
		padding: 0.15rem 0.4rem;
		border: 1px solid var(--line);
		color: var(--muted);
	}
	.where {
		font-size: 0.9375rem;
		color: var(--muted);
		white-space: nowrap;
	}
	.tags {
		display: flex;
		gap: 0.35rem;
		justify-content: end;
	}
	.tag {
		padding: 0.15rem 0.5rem;
		background: var(--velvet);
		font: 700 0.75rem/1.3 var(--display);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.empty {
		padding: 1.5rem 0;
		border-block: 1px solid var(--line);
		color: var(--muted);
	}
	@media (max-width: 44rem) {
		.row {
			grid-template-columns: 4.5rem minmax(0, 1fr);
		}
		.where,
		.tags {
			grid-column: 2;
			justify-content: start;
		}
	}
</style>
