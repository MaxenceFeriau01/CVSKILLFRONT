import { FormGroup, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

function CompanyContactDetails({ form }: any) {
	const { control } = form

	return (
		<>
			<FormGroup row>
				<Controller
					name="contactFirstName"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Prénom"
							variant="outlined"
							autoComplete="given-name"
						/>
					)}
				/>
				<Controller
					name="contactLastName"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Nom"
							variant="outlined"
							autoComplete="family-name"
						/>
					)}
				/>
			</FormGroup>
			<FormGroup row>
				<Controller
					name="contactNum"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Telephone"
							variant="outlined"
							type="tel"
							autoComplete="tel"
						/>
					)}
				/>
				<Controller
					name="contactMail"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							value={value}
							onChange={onChange}
							label="Email"
							variant="outlined"
							type="email"
							autoComplete="email"
						/>
					)}
				/>
			</FormGroup>
			<Controller
				name="address"
				control={control}
				defaultValue=""
				render={({ field: { onChange, value } }) => (
					<TextField
						required
						label="Adresse"
						variant="outlined"
						value={value}
						onChange={onChange}
						className="form-control-full"
						autoComplete="street-address"
					/>
				)}
			/>
			<FormGroup row>
				<Controller
					name="town"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							label="Ville"
							variant="outlined"
							value={value}
							onChange={onChange}
						/>
					)}
				/>
				<Controller
					name="postalCode"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							type="number"
							required
							label="Code postal"
							variant="outlined"
							value={value}
							onChange={onChange}
							autoComplete="postal-code"
						/>
					)}
				/>
			</FormGroup>
		</>
	)
}

export default CompanyContactDetails
