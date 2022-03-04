import { FormGroup, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import contact from "../../resources/images/contact.svg"

function CompanyContactDetails({ form }: any) {
	const {
		control,
		formState: { errors },
	} = form

	return (
		<>
			<img
				className="company-details-form__img"
				src={contact}
				alt="Contact"
			/>
			<FormGroup row>
				<Controller
					name="contactFirstName"
					control={control}
					rules={{
						required: "required",
					}}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Prénom"
							variant="outlined"
							autoComplete="given-name"
							helperText={errors?.contactFirstName?.message}
							error={!!errors?.contactFirstName}
						/>
					)}
				/>
				<Controller
					name="contactLastName"
					control={control}
					rules={{
						required: "required",
					}}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Nom"
							variant="outlined"
							autoComplete="family-name"
							helperText={errors?.contactLastName?.message}
							error={!!errors?.contactLastName}
						/>
					)}
				/>
			</FormGroup>
			<FormGroup row>
				<Controller
					name="contactNum"
					control={control}
					rules={{
						required: "required",
					}}
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							helperText={errors?.contactNum?.message}
							error={!!errors?.contactNum}
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
				rules={{
					required: "required",
				}}
				defaultValue=""
				render={({ field: { onChange, value } }) => (
					<TextField
						required
						helperText={errors?.address?.message}
						error={!!errors?.address}
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
					rules={{
						required: "required",
					}}
					name="town"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							helperText={errors?.town?.message}
							error={!!errors?.town}
							label="Ville"
							variant="outlined"
							value={value}
							onChange={onChange}
						/>
					)}
				/>
				<Controller
					name="postalCode"
					rules={{
						required: "required",
					}}
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							type="number"
							helperText={errors?.postalCode?.message}
							error={!!errors?.postalCode}
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
