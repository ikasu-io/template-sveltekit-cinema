// The regulars: things that happen every week or every month, not tied to
// one film. Shown on the home page and the visit page.
export interface Regular {
	title: string;
	when: string;
	text: string;
	image?: string; // a photo name from src/lib/data/images.ts
}

export const regulars: Regular[] = [
	{
		title: 'Silent film with live piano',
		when: 'Last Sunday of the month, 16:00',
		text: 'A restored silent film on 35mm, with Ruth Anning improvising on the upright piano in front of the screen.',
		image: 'film-cans'
	},
	{
		title: 'Kids’ Club',
		when: 'Saturdays, 10:30',
		text: 'A family film for £4 a ticket, lights half up, sound a little lower, and nobody minds if you talk.',
		image: 'kids-club'
	},
	{
		title: 'Parent & baby',
		when: 'Wednesdays, 11:00',
		text: 'A film for grown-ups with the lights up a touch, changing table in Screen 1, buggies welcome in the aisle.'
	},
	{
		title: 'Relaxed screenings',
		when: 'First Sunday of the month',
		text: 'No trailers, softer sound, lights half up, and you can come and go. For anyone who finds a cinema too much.'
	}
];
