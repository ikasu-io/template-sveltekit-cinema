import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
	plugins: [
		// `import photo from './x.jpg?photo'` turns a photo into WebP files in
		// four widths and gives back { src, srcset, w, h } for <img>.
		imagetools({
			defaultDirectives: (url) =>
				url.searchParams.has('photo')
					? new URLSearchParams({ w: '480;800;1200;1600', format: 'webp', quality: '70', as: 'img' })
					: new URLSearchParams()
		}),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Every page is prerendered to HTML; 404.html for static hosts.
			adapter: adapter({ fallback: '404.html' })
		})
	]
});
