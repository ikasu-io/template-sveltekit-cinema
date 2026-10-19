<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/data/site.ts';
	import Logo from './Logo.svelte';

	const links = [
		{ href: '/#whats-on', label: 'What’s on' },
		{ href: '/visit/', label: 'Visit' },
		{ href: '/membership/', label: 'Membership' },
		{ href: '/about/', label: 'About' }
	];

	function current(href: string): boolean {
		return !href.includes('#') && page.url.pathname === href;
	}
</script>

<header class="header">
	<div class="container row">
		<a class="brand" href="/">
			<Logo />
			<span>{site.name}</span>
		</a>
		<nav aria-label="Main">
			<ul class="links">
				{#each links as link (link.href)}
					<li>
						<a href={link.href} aria-current={current(link.href) ? 'page' : undefined}>{link.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
		<a class="phone" href="tel:{site.phone.replaceAll(' ', '')}">
			<span>Box office</span>
			{site.phone}
		</a>
		<details class="menu">
			<summary>Menu</summary>
			<ul>
				{#each links as link (link.href)}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
				<li><a href="tel:{site.phone.replaceAll(' ', '')}">Box office {site.phone}</a></li>
			</ul>
		</details>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 20;
		background: rgb(18 16 20 / 0.92);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--line);
	}
	.row {
		display: flex;
		align-items: center;
		gap: 2rem;
		min-height: 4.25rem;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--screen);
		text-decoration: none;
		font: 800 1.6rem/1 var(--display);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	nav {
		margin-left: auto;
	}
	.links {
		display: flex;
		gap: 1.75rem;
	}
	.links a {
		color: var(--screen);
		text-decoration: none;
		font: 700 1.0625rem/1 var(--display);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.links a:hover,
	.links a[aria-current='page'] {
		color: var(--brass);
	}
	.phone {
		display: grid;
		text-align: right;
		color: var(--screen);
		text-decoration: none;
		font: 600 0.9375rem/1.2 var(--mono);
	}
	.phone span {
		font: 700 0.6875rem/1.2 var(--display);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--brass);
	}
	.menu {
		display: none;
		position: relative;
		margin-left: auto;
	}
	.menu summary {
		cursor: pointer;
		list-style: none;
		padding: 0.45rem 0.9rem;
		border: 1px solid var(--line);
		font: 700 1rem/1 var(--display);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.menu summary::-webkit-details-marker {
		display: none;
	}
	.menu ul {
		position: absolute;
		right: 0;
		top: calc(100% + 0.5rem);
		min-width: 14rem;
		padding: 0.75rem;
		background: var(--smoke);
		border: 1px solid var(--line);
	}
	.menu a {
		display: block;
		padding: 0.55rem 0.5rem;
		color: var(--screen);
		text-decoration: none;
		font: 700 1.125rem/1.2 var(--display);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	@media (max-width: 52rem) {
		nav,
		.phone {
			display: none;
		}
		.menu {
			display: block;
		}
	}
</style>
