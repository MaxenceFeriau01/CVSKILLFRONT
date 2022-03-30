import { Alert } from "@mui/material"
import Select from "react-select"

function CustomSelect(props: any) {
	const { disabled, value, required } = props
	const styles = {
		control: (base: any) => ({
			...base,
			"&:hover": {
				borderColor: "rgba(0, 0, 0, 0.87)",
			}, // border style on hover
			border: "1px solid lightgray", // default border color
			boxShadow: "none", // no box-shadow
			zIndex: 1,
			cursor: "pointer",
		}),
	}
	return (
		<>
			<Select
				classNamePrefix="react-select"
				autoComplete="off"
				styles={styles}
				{...props}
			/>
			{!disabled && required && (
				<input
					tabIndex={-1}
					autoComplete="off"
					style={{
						position: "absolute",
						opacity: 0,
						height: 0,
						width: 0,
						right: "50%",
					}}
					value={value}
					required={required}
					onChange={() => {}}
				/>
			)}
			{required &&
				(value === null || value === undefined || value === "") && (
					<Alert className="w-full" severity="error">
						Ce champ est requis
					</Alert>
				)}
		</>
	)
}

export default CustomSelect
