import Select from "react-select"

function CustomSelect(props: any) {
	const styles = {
		control: (base: any) => ({
			...base,
			"&:hover": {
				borderColor: "rgba(0, 0, 0, 0.87)",
			}, // border style on hover
			border: "1px solid lightgray", // default border color
			boxShadow: "none", // no box-shadow
		}),
	}

	return <Select styles={styles} {...props} />
}

export default CustomSelect
