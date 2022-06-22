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
			primaryDark: "#23866d",
			primaryLight: "#41ceaa",
			secondary: "#d3d61f",
			secondaryDark: "#a7a919",
			secondaryLight: "#e1e444",
			gray: "#e4e2e0",
			warning: "#ff9966",
			white: "white",
			black: "#2d2d2d",
			info: "#5186f3",
			red: "#b70000",
			background:"#f7fafb"
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
