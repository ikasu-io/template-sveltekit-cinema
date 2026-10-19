import { error } from '@sveltejs/kit';
import { currentFilms, filmBySlug, today } from '#lib/programme.ts';
import type { EntryGenerator, PageLoad } from './$types';

// One page per film that is on or still to come.
export const entries: EntryGenerator = () => currentFilms(today()).map((film) => ({ slug: film.slug }));

export const load: PageLoad = ({ params }) => {
	const film = filmBySlug(params.slug);
	if (!film) error(404, 'No film with that name is on at The Orrery.');
	return { film };
};
