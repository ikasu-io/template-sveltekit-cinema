// Membership levels, cheapest first. Prices in pounds per year.
export interface Membership {
	name: string;
	price: number;
	perks: string[];
	highlight?: boolean;
}

export const memberships: Membership[] = [
	{
		name: 'Friend',
		price: 30,
		perks: ['£8 tickets for every film', 'Our monthly programme by post or email', 'Book a week before everyone else']
	},
	{
		name: 'Patron',
		price: 75,
		perks: [
			'Everything a Friend gets',
			'Two free tickets a month',
			'10% off at the café-bar',
			'Invitations to members’ previews'
		],
		highlight: true
	},
	{
		name: 'Projectionist',
		price: 180,
		perks: [
			'Everything a Patron gets',
			'A tour of the projection booth and a frame of film to keep',
			'Your name on the seat of your choice in Screen 1'
		]
	}
];

export const membershipFaq = [
	{
		q: 'How do I join?',
		a: 'At the box office, by phone or by email. Membership starts the day you pay and runs for a year.'
	},
	{
		q: 'Can I give membership as a present?',
		a: 'Yes — we post a card with the member’s name, or email it if you’re in a hurry.'
	},
	{
		q: 'Where does the money go?',
		a: 'The Orrery is run by a charitable trust. Membership pays for the 35mm projector’s upkeep, the relaxed screenings and our schools programme.'
	}
];
