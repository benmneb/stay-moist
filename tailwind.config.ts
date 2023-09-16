/** @type {import('https://esm.sh/tailwindcss@3.1.8').Config} */
export default {
	content: [
		'./routes/**/*.{tsx,ts}',
		'./islands/**/*.{tsx,ts}',
		'./components/**/*.{tsx,ts}',
	],
	theme: {
		extend: {
			boxShadow: {
				next: '0 4px 14px 0 rgba(0, 0, 0, 0.3)',
			},
		},
	},
	plugins: [],
}
