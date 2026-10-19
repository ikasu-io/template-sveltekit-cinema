// Works out what is on when from src/lib/data/films.ts. Dates are plain
// YYYY-MM-DD strings in the cinema's own time zone, so a screening is on the
// same day wherever the site is built or viewed.
import { films, type Film, type Tag, type Weekday } from './data/films.ts';
import { site } from './data/site.ts';

const WEEKDAYS: Weekday[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export interface Screening {
	film: Film;
	date: string;
	time: string;
	tags: Tag[];
}

/** Today in Halwick, as YYYY-MM-DD. */
export function today(now = new Date()): string {
	return new Intl.DateTimeFormat('en-CA', { timeZone: site.timeZone }).format(now);
}

export function addDays(date: string, days: number): string {
	const d = new Date(`${date}T12:00:00Z`);
	d.setUTCDate(d.getUTCDate() + days);
	return d.toISOString().slice(0, 10);
}

export function weekday(date: string): Weekday {
	return WEEKDAYS[new Date(`${date}T12:00:00Z`).getUTCDay()];
}

export function formatDay(date: string, style: 'short' | 'long' = 'long'): string {
	return new Intl.DateTimeFormat('en-GB', {
		weekday: style,
		day: 'numeric',
		month: style === 'long' ? 'long' : 'short',
		timeZone: 'UTC'
	}).format(new Date(`${date}T12:00:00Z`));
}

function runsOn(film: Film, date: string): boolean {
	return film.run.from <= date && date <= film.run.until;
}

/** Every screening on one day, earliest first. */
export function screeningsOn(date: string): Screening[] {
	return films
		.filter((film) => runsOn(film, date))
		.flatMap((film) =>
			(film.times[weekday(date)] ?? []).map((time) => ({ film, date, time, tags: film.tags ?? [] }))
		)
		.sort((a, b) => a.time.localeCompare(b.time));
}

/** The screenings of one film over the next `days` days. */
export function screeningsOf(film: Film, from: string, days = 14): Screening[] {
	return Array.from({ length: days }, (_, i) => addDays(from, i)).flatMap((date) =>
		screeningsOn(date).filter((s) => s.film.slug === film.slug)
	);
}

export function nowShowing(date: string): Film[] {
	return films.filter((film) => runsOn(film, date));
}

export function comingSoon(date: string): Film[] {
	return films
		.filter((film) => film.run.from > date)
		.sort((a, b) => a.run.from.localeCompare(b.run.from));
}

/** Films still on or still to come — the ones that get a page. */
export function currentFilms(date: string): Film[] {
	return films.filter((film) => film.run.until >= date);
}

export function filmBySlug(slug: string): Film | undefined {
	return films.find((film) => film.slug === slug);
}
