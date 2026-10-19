# The Orrery — an independent cinema website built with SvelteKit

> **The Orrery is a fictional cinema.** The town of Halwick, the people,
> the films and the photos are all made up. The site, its content and its
> images were generated with AI, and it is maintained with
> [Ikasu](https://ikasu.io), an AI content copilot for static sites.
> Use it as a starting point for your own cinema, theatre or venue.

A website for a small two-screen cinema: this week's programme by day, a
page for every film with all its screenings, coming soon, the regular
events, membership, prices and access.

- [SvelteKit](https://svelte.dev/docs/kit) 3 and Svelte 5, every page
  prerendered to static HTML (`adapter-static`)
- Film posters drawn in CSS from each film's title and colour — no film
  images to license
- Photos resized and converted to WebP at build time (`vite-imagetools`)
- Works without JavaScript; the day picker and "today" update in the browser
- Search-engine data for the cinema and every film (schema.org), sitemap

## Getting started

Needs Node.js 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in build/
npm run preview  # serve build/ locally
```

## Where to change what

| To change … | Edit |
|---|---|
| A film, its dates or its times | `src/lib/data/films.ts` — one object per film |
| Add a film | copy an object in `src/lib/data/films.ts`; it gets its own page at `/films/<slug>/` |
| Prices, box office hours, address, phone | `src/lib/data/site.ts` |
| The weekly and monthly regulars | `src/lib/data/events.ts` |
| Membership levels and questions | `src/lib/data/memberships.ts` |
| Page texts | the `+page.svelte` file of each page in `src/routes/` |
| Photos | `src/lib/images/`, with alt texts in `src/lib/data/images.ts` |
| Colours and fonts | `src/app.css` (tokens at the top) |

The build runs `svelte-check` first, so a film with a missing field or a
wrong value stops the build and names the file and the line.

The programme is decided when the site is built, and the home page moves
on to "today" in the visitor's browser. Films whose run has ended drop
off at the next build.

## Deploying

`npm run build` writes a static site to `build/`. Any static host works:
Netlify, Cloudflare Pages, GitHub Pages, your own server. Set `url` in
`src/lib/data/site.ts` to your domain.

## Licence

MIT, see [LICENSE](LICENSE). Images: see [IMAGES.md](IMAGES.md).
