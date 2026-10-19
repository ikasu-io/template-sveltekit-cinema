<script lang="ts">
	import '../app.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<a class="skip" href="#main">Skip to content</a>
<Header />
<main id="main">
	{@render children()}
</main>
<Footer />
