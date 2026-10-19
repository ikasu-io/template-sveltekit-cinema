// The cinema itself: name, address, box office, prices. Change a price or
// the box office hours here and every page that shows them follows.
export const site = {
	name: 'The Orrery',
	tagline: 'Two screens, one projector that still runs film, and the best seats in Halwick.',
	url: 'https://theorrery.example',
	address: { building: 'Corn Exchange', street: 'Market Hill', town: 'Halwick' },
	phone: '+44 1632 960581',
	email: 'boxoffice@theorrery.example',
	// The cinema's own time zone: "today" on the site is today in Halwick.
	timeZone: 'Europe/London',
	boxOffice: [
		{ days: 'Tuesday to Friday', hours: '17:00 until the last film starts' },
		{ days: 'Saturday and Sunday', hours: '10:00 until the last film starts' },
		{ days: 'Monday', hours: 'Closed' }
	],
	// Ticket prices in pounds.
	prices: [
		{ label: 'Adult', price: 11.5 },
		{ label: 'Concession (students, over 65s, jobseekers)', price: 9 },
		{ label: 'Under 16', price: 6.5 },
		{ label: 'Members', price: 8 },
		{ label: 'Kids’ Club (Saturday mornings)', price: 4 }
	]
} as const;

export function pounds(value: number): string {
	return new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
		minimumFractionDigits: value % 1 ? 2 : 0
	}).format(value);
}
