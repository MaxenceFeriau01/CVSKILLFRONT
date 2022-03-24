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
			primary: "#2daf8e",
			secondary: "#d3d61f",
			gray: "#e4e2e0",
			warning: "#ff9966",
			white: "white",
			info :"#5186f3"
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
