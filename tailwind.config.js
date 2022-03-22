module.exports = {
	important: true,
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			tablet: "768px",
			laptop: "1024px",
			desktop: "1440px",
		},
		colors: {
			primary: "var(--color-primary)",
			secondary: "var(--color-secondary)",
			gray: "var(--color-gray)",
			warning: "var(--color-warning)",
			white: "var(--color-white)",
		},
		listStyleType: {
			none: "none",
			disc: "disc",
			decimal: "decimal",
			square: "square",
			roman: "upper-roman",
		},
	},

	plugins: [],
}
