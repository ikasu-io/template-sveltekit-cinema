<script lang="ts">
	import { images } from '#lib/data/images.ts';

	// A photo by its name in src/lib/data/images.ts.
	let {
		name,
		sizes = '100vw',
		eager = false,
		class: className = ''
	}: { name: string; sizes?: string; eager?: boolean; class?: string } = $props();

	const photo = $derived(images[name]);
</script>

{#if photo}
	<img
		class={className}
		src={photo.src}
		srcset={photo.srcset}
		{sizes}
		width={photo.w}
		height={photo.h}
		alt={photo.alt}
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : undefined}
		decoding="async"
	/>
{/if}
