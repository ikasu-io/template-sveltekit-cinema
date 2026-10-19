<script lang="ts">
	import { site } from '#lib/data/site.ts';
</script>

<footer class="footer">
	<div class="container grid">
		<div>
			<p class="name">{site.name}</p>
			<p class="muted">{site.tagline}</p>
		</div>
		<div>
			<h2 class="label">Find us</h2>
			<p>{site.address.building}<br />{site.address.street}, {site.address.town}</p>
		</div>
		<div>
			<h2 class="label">Box office</h2>
			<p>
				<a href="tel:{site.phone.replaceAll(' ', '')}">{site.phone}</a><br />
				<a href="mailto:{site.email}">{site.email}</a>
			</p>
		</div>
	</div>
	<div class="container bottom">
		<p>Fictional demo site — content and images generated with AI</p>
		<p><a href="/about/">About the cinema</a> · <a href="/visit/">Prices &amp; access</a></p>
	</div>
</footer>

<style>
	.footer {
		margin-top: 2rem;
		border-top: 1px solid var(--line);
		background: #0c0a0d;
		font-size: 0.9375rem;
	}
	.grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr;
		gap: 2rem;
		padding-block: 3rem 2rem;
	}
	.name {
		font: 800 2.5rem/1 var(--display);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.muted {
		margin-top: 0.75rem;
		color: var(--muted);
		max-width: 24rem;
	}
	.label {
		font-size: 0.8125rem;
		letter-spacing: 0.2em;
		color: var(--brass);
		margin-bottom: 0.6rem;
	}
	.bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.5rem 2rem;
		padding-block: 1.25rem 2rem;
		border-top: 1px solid var(--line);
		color: var(--muted);
		font-size: 0.875rem;
	}
	@media (max-width: 48rem) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
