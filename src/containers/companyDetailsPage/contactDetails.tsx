import { FormGroup, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import {
	INPUT_FORM_ONE,
	INPUT_FORM_TWO,
	TYPE_COMPANY_OPTIONS,
} from "./constants"

function ContactDetails({ form }: any) {
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
					name={INPUT_FORM_TWO[0]}
					control={control}
					rules={{
						required: "Le prénom de contact est requis",
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
							helperText={errors[INPUT_FORM_TWO[0]]?.message}
							error={!!errors[INPUT_FORM_TWO[0]]?.message}
						/>
					)}
				/>
				<Controller
					name={INPUT_FORM_TWO[1]}
					control={control}
					rules={{
						required: "Le nom de contact est requis",
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
							helperText={errors[INPUT_FORM_TWO[1]]?.message}
							error={!!errors[INPUT_FORM_TWO[1]]}
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
					name={INPUT_FORM_TWO[2]}
					control={control}
					defaultValue=""
					rules={{
						required: "Le numéro de téléphone mobile est requis",
					}}
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							value={value}
							onChange={onChange}
							label="Telephone mobile"
							variant="outlined"
							type="tel"
							autoComplete="tel"
							helperText={errors[INPUT_FORM_TWO[2]]?.message}
							error={!!errors[INPUT_FORM_TWO[2]]}
						/>
					)}
				/>
				<Controller
					name={INPUT_FORM_TWO[9]}
					control={control}
					rules={{
						required: "Le numéro de téléphone fixe est requis",
					}}
					render={({ field: { onChange, value } }) => (
						<TextField
							value={value ?? ""}
							onChange={onChange}
							label="Telephone fixe"
							variant="outlined"
							type="tel"
							autoComplete="tel"
							helperText={errors[INPUT_FORM_TWO[9]]?.message}
							error={!!errors[INPUT_FORM_TWO[9]]}
						/>
					)}
				/>
			</FormGroup>
			<Controller
				name={INPUT_FORM_TWO[3]}
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
						helperText={errors[INPUT_FORM_TWO[3]]?.message}
						error={!!errors[INPUT_FORM_TWO[3]]}
					/>
				)}
			/>
			<FormGroup row>
				<Controller
					rules={{
						required: "La ville est requise",
					}}
					name={INPUT_FORM_TWO[4]}
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
					name={INPUT_FORM_TWO[5]}
					rules={{
						required: "Le code postal est requis",
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
							autoComplete="new-password"
						/>
					)}
				/>
			</FormGroup>

			{watch(INPUT_FORM_ONE[0]) === TYPE_COMPANY_OPTIONS[2].value && (
				<>
					<Controller
						name={INPUT_FORM_TWO[6]}
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
							name={INPUT_FORM_TWO[7]}
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
							name={INPUT_FORM_TWO[8]}
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
