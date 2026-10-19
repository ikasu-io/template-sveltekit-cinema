// The programme: one object per film. Every film here is made up.
//
// Add a film: copy one object, give it its own `slug` (the page address,
// /films/<slug>/), its dates in `run` and its times per weekday. A film whose
// run has ended disappears from the site at the next build; one that hasn't
// started yet shows under "Coming soon".
//
// `times`: start times per weekday (mon … sun), 24-hour clock. A day that
// isn't listed has no screening. `tags` add a label to every screening.

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Certificate = 'U' | 'PG' | '12A' | '15' | '18';
export type Tag = 'subtitled' | '35mm' | 'relaxed' | 'parent & baby' | 'Q&A';

export interface Film {
	slug: string;
	title: string;
	year: number;
	director: string;
	country: string;
	language: string;
	runtime: number; // minutes
	certificate: Certificate;
	/** The poster's background colour; the title is set on top of it. */
	colour: string;
	synopsis: string;
	screen: 1 | 2;
	run: { from: string; until: string }; // YYYY-MM-DD, both days included
	times: Partial<Record<Weekday, string[]>>;
	tags?: Tag[];
}

export const films: Film[] = [
	{
		slug: 'the-salt-road',
		title: 'The Salt Road',
		year: 2026,
		director: 'Inès Marchal',
		country: 'France',
		language: 'French',
		runtime: 112,
		certificate: '12A',
		colour: '#2E5E6E',
		synopsis:
			'A salt worker on the Atlantic marshes takes in her teenage nephew for one summer. Quiet, patient and very funny about family, with the most beautiful light you will see on a screen this year.',
		screen: 1,
		run: { from: '2026-10-02', until: '2027-03-31' },
		times: {
			tue: ['18:15'],
			wed: ['18:15'],
			thu: ['18:15'],
			fri: ['18:00', '20:45'],
			sat: ['14:00', '18:00'],
			sun: ['14:00', '17:30']
		},
		tags: ['subtitled']
	},
	{
		slug: 'night-ferry',
		title: 'Night Ferry',
		year: 2026,
		director: 'Callum Rees',
		country: 'United Kingdom',
		language: 'English',
		runtime: 98,
		certificate: '15',
		colour: '#3B2A55',
		synopsis:
			'Two strangers miss the last ferry to the island and spend a night in a closed port town. A small, sharp thriller that never raises its voice, shot on 35mm — and shown on it here.',
		screen: 1,
		run: { from: '2026-10-09', until: '2027-03-31' },
		times: { tue: ['20:40'], wed: ['20:40'], thu: ['20:40'], sat: ['20:45'], sun: ['20:00'] },
		tags: ['35mm']
	},
	{
		slug: 'the-orchard-keepers',
		title: 'The Orchard Keepers',
		year: 2025,
		director: 'Hanne Velde',
		country: 'Norway',
		language: 'Norwegian',
		runtime: 104,
		certificate: 'PG',
		colour: '#5E6B2F',
		synopsis:
			'Three generations, one fjord-side orchard and a very bad harvest. Warm and unhurried; the grandmother steals every scene she is in.',
		screen: 2,
		run: { from: '2026-09-25', until: '2027-03-31' },
		times: { tue: ['14:30', '19:00'], thu: ['14:30', '19:00'], sat: ['16:30'], sun: ['11:00'] },
		tags: ['subtitled']
	},
	{
		slug: 'static',
		title: 'Static',
		year: 2026,
		director: 'Priya Venkatesan',
		country: 'United Kingdom',
		language: 'English',
		runtime: 89,
		certificate: '15',
		colour: '#8A2E2E',
		synopsis:
			'A late-night radio host keeps getting calls from someone who knows what she did. A tight, nervy debut; the director joins us for a Q&A on Friday nights.',
		screen: 2,
		run: { from: '2026-10-16', until: '2027-03-31' },
		times: { wed: ['19:15'], fri: ['19:00'], sat: ['21:00'] },
		tags: ['Q&A']
	},
	{
		slug: 'little-giants',
		title: 'Little Giants',
		year: 2026,
		director: 'Tomás Herrera',
		country: 'Spain',
		language: 'English (dubbed)',
		runtime: 84,
		certificate: 'U',
		colour: '#D08A2C',
		synopsis:
			'An animated adventure about a family of very small people who live inside a lighthouse. For anyone over four and every parent who has to watch it twice.',
		screen: 2,
		run: { from: '2026-10-02', until: '2027-03-31' },
		times: { sat: ['10:30', '13:00'], sun: ['13:00'], wed: ['10:30'] },
		tags: ['relaxed']
	},
	{
		slug: 'the-quiet-year',
		title: 'The Quiet Year',
		year: 2025,
		director: 'Yusuf Demir',
		country: 'Turkey',
		language: 'Turkish',
		runtime: 131,
		certificate: '12A',
		colour: '#4A4A52',
		synopsis:
			'A village schoolteacher counts down the months until the dam floods the valley. Long, gentle and devastating in its last ten minutes.',
		screen: 1,
		run: { from: '2026-10-16', until: '2027-03-31' },
		times: { wed: ['11:00'], thu: ['13:30'], sun: ['19:30'] },
		tags: ['subtitled', 'parent & baby']
	},
	{
		slug: 'the-lighthouse-keepers-daughter',
		title: 'The Lighthouse Keeper’s Daughter',
		year: 1926,
		director: 'Edwin Thorne',
		country: 'United Kingdom',
		language: 'Silent, English intertitles',
		runtime: 76,
		certificate: 'U',
		colour: '#B3A68C',
		synopsis:
			'Our monthly silent film with live piano: a restored melodrama of storms, smugglers and a very brave daughter, accompanied by Ruth Anning on the Orrery’s upright.',
		screen: 1,
		run: { from: '2026-10-25', until: '2026-10-25' },
		times: { sun: ['16:00'] },
		tags: ['35mm']
	},
	{
		slug: 'harbour-lights',
		title: 'Harbour Lights',
		year: 2026,
		director: 'Aoife Brennan',
		country: 'Ireland',
		language: 'English',
		runtime: 101,
		certificate: '12A',
		colour: '#1F4A7A',
		synopsis:
			'A fishing town votes on whether to sell its harbour to a cruise company. A comedy with a lot of shouting in the community hall and a surprisingly tender ending.',
		screen: 1,
		run: { from: '2026-11-06', until: '2027-03-31' },
		times: { tue: ['18:00'], thu: ['20:30'], fri: ['18:15'], sat: ['18:15'] }
	},
	{
		slug: 'winterreise',
		title: 'Winterreise',
		year: 2026,
		director: 'Lena Brückner',
		country: 'Germany',
		language: 'German',
		runtime: 117,
		certificate: '12A',
		colour: '#6E8796',
		synopsis:
			'A retired singer walks Schubert’s song cycle across the Harz mountains in January. Part concert film, part road movie, all snow.',
		screen: 2,
		run: { from: '2026-11-20', until: '2027-03-31' },
		times: { fri: ['20:30'], sat: ['18:45'], sun: ['17:00'] },
		tags: ['subtitled']
	}
];
