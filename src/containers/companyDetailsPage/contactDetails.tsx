import { Alert, FormGroup, InputLabel, TextField } from "@mui/material"
import { Controller, FieldValues, UseFormReturn } from "react-hook-form"
import ReactSelectOption from "../../api/models/reactSelectOption"
import CustomSelect from "../../components/inputs/customSelect"
import { INPUT_FORM_ONE, TYPE_COMPANY_OPTIONS } from "./constants"

interface ContactDetailsProps {
	form: UseFormReturn<FieldValues, object>
	cities?: ReactSelectOption[]
}

function ContactDetails({ form, cities }: ContactDetailsProps) {
	const {
		watch,
		control,
		formState: { errors },
	} = form

	return (
		<>
			<h3>Où vous contacter?</h3>
			<FormGroup row>
				<Controller
					name="contactFirstName"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
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
							value={value}
							onChange={onChange}
							label="Nom"
							variant="outlined"
							autoComplete="family-name"
						/>
					)}
				/>
			</FormGroup>
			<Controller
				name="contactMail"
				control={control}
				defaultValue=""
				render={({ field: { onChange, value } }) => (
					<TextField
						className="tablet:w-full"
						value={value}
						onChange={onChange}
						label="Email"
						variant="outlined"
						type="email"
						autoComplete="email"
					/>
				)}
			/>
			<FormGroup row>
				<Controller
					name="contactNum"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							value={value}
							onChange={onChange}
							label="Telephone mobile"
							variant="outlined"
							type="tel"
							autoComplete="tel"
						/>
					)}
				/>
				<Controller
					name="fixContactNum"
					control={control}
					render={({ field: { onChange, value } }) => (
						<TextField
							value={value ?? ""}
							onChange={onChange}
							label="Telephone fixe"
							variant="outlined"
							type="tel"
							autoComplete="tel"
						/>
					)}
				/>
			</FormGroup>
			<Controller
				name="address"
				control={control}
				rules={{
					required: "L'adresse est requise",
				}}
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
						helperText={errors.address?.message}
						error={!!errors.address?.error}
					/>
				)}
			/>

			<div className="select z-10">
				<InputLabel>Code postal, Ville *</InputLabel>
				<Controller
					rules={{
						required: "Ce champ est requis",
					}}
					name="city"
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CustomSelect
							isSearchable
							options={cities}
							placeholder="Tapez la ville ou le code postal..."
							onBlur={onBlur}
							value={cities?.find(
								(c: ReactSelectOption) => c.value === value
							)}
							onChange={(val: ReactSelectOption) =>
								onChange(val.value)
							}
						/>
					)}
				/>
				{errors?.city && (
					<Alert severity="error">{errors.city.message}</Alert>
				)}
			</div>

			{watch(INPUT_FORM_ONE[0]) === TYPE_COMPANY_OPTIONS[2].value && (
				<>
					<Controller
						name="region"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								className="form-control-full"
								value={value}
								onChange={onChange}
								label="Région"
								variant="outlined"
								type="text"
							/>
						)}
					/>

					<FormGroup row>
						<Controller
							name="department"
							control={control}
							defaultValue=""
							render={({ field: { onChange, value } }) => (
								<TextField
									required
									value={value}
									onChange={onChange}
									label="Département"
									variant="outlined"
									type="text"
								/>
							)}
						/>
						<Controller
							name="epci"
							control={control}
							defaultValue=""
							render={({ field: { onChange, value } }) => (
								<TextField
									value={value}
									onChange={onChange}
									label="EPCI"
									variant="outlined"
									type="text"
								/>
							)}
						/>
					</FormGroup>
				</>
			)}
		</>
	)
}

export default ContactDetails
