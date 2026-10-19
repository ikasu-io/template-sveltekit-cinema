import { site } from '#lib/data/site.ts';
import { currentFilms, today } from '#lib/programme.ts';

export const prerender = true;
export const trailingSlash = 'never';

// Every page, for search engines.
export function GET() {
	const paths = ['/', '/visit/', '/membership/', '/about/'].concat(
		currentFilms(today()).map((film) => `/films/${film.slug}/`)
	);
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
