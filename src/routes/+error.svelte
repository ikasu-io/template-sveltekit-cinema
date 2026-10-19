<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Not found' : 'Error'} · {site.name}</title>
</svelte:head>

<section class="section container">
	<p class="eyebrow">{page.status}</p>
	<h1 class="title">{page.status === 404 ? 'This reel is missing' : 'Something went wrong'}</h1>
	<p class="lead">
		{page.status === 404
			? 'The page you were looking for isn’t on our programme.'
			: page.error?.message}
	</p>
	<p><a class="button" href="/#whats-on">See what’s on</a></p>
</section>

<style>
	.title {
		margin-top: 0.75rem;
		font-size: clamp(3rem, 9vw, 7rem);
	}
	.lead {
		margin: 1rem 0 2rem;
	}
</style>
