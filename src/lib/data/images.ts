// Every photo on the site, with its alt text. Add a photo: put the file in
// src/lib/images/ (at least 1600 px wide), import it here with `?photo` and
// give it an alt text that says what is on it. Pages refer to photos by
// these names. The build makes WebP files in four widths from each.
import audience from '#lib/images/audience.jpg?photo';
import facadeNight from '#lib/images/facade-night.jpg?photo';
import filmCans from '#lib/images/film-cans.jpg?photo';
import foyerBar from '#lib/images/foyer-bar.jpg?photo';
import heroAuditorium from '#lib/images/hero-auditorium.jpg?photo';
import kidsClub from '#lib/images/kids-club.jpg?photo';
import projector from '#lib/images/projector.jpg?photo';
import screenTwo from '#lib/images/screen-two.jpg?photo';

export interface Photo {
	src: string;
	srcset: string;
	w: number;
	h: number;
	alt: string;
}

export const images: Record<string, Photo> = {
	'hero-auditorium': {
		...heroAuditorium,
		alt: 'The empty auditorium of Screen 1 from the back rows: red velvet seats, brass wall lights and a glowing screen'
	},
	'foyer-bar': {
		...foyerBar,
		alt: 'The café-bar in the foyer in the evening, with a dark wood counter and bistro tables'
	},
	projector: {
		...projector,
		alt: 'The 35mm projector in the booth, a reel turning and the beam lit by dust'
	},
	'facade-night': {
		...facadeNight,
		alt: 'The columned front of the old corn exchange at night, the doors lit, wet cobbles in front'
	},
	'screen-two': {
		...screenTwo,
		alt: 'Screen 2, a small room with mismatched armchairs and side tables'
	},
	audience: {
		...audience,
		alt: 'An audience from behind, silhouetted against the bright screen'
	},
	'film-cans': {
		...filmCans,
		alt: 'Round metal film cans and a reel of 35mm film on a workbench'
	},
	'kids-club': {
		...kidsClub,
		alt: 'Children from behind in big red seats on a Saturday morning'
	}
};
