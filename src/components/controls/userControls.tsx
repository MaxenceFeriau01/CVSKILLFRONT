import { Alert, FormHelperText, InputLabel, TextField } from "@mui/material"
import { Controller, FieldValues, UseFormSetValue } from "react-hook-form"
import ReactSelectOption from "../../api/models/reactSelectOption"
import {
	STUDENT_PERIOD_OPTIONS,
	STATUS_HIGH_SCHOOL_STUDENT,
	STATUS_STUDENT,
} from "../../utils/constants"
import CustomSelect from "../inputs/customSelect"

import { CIVILITY_OPTIONS, DIPLOMA_OPTIONS } from "./constants"
import PdfUpload from "../inputs/pdfUpload"

interface UserControlsProps {
	control: any
	setValue: UseFormSetValue<FieldValues>
	watch: any
	errors: any
	register: any // FileList | FileDb
	jobsOptions: Array<ReactSelectOption> | undefined
	statusesOptions: Array<ReactSelectOption> | undefined
	isProfile?: boolean
}

function UserControls({
	control,
	watch,
	errors,
	register,
	jobsOptions,
	statusesOptions,
	setValue,
	isProfile = false,
}: UserControlsProps) {
	return (
		<>
			<div className="select-form-control z-60">
				<InputLabel>Civilité *</InputLabel>
				<Controller
					rules={{
						required: "La civilité est requise",
					}}
					name="civility"
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CustomSelect
							isSearchable
							options={CIVILITY_OPTIONS}
							placeholder="Choisissez..."
							onBlur={onBlur}
							value={CIVILITY_OPTIONS.find(
								(c: ReactSelectOption) => c.value === value
							)}
							onChange={(val: ReactSelectOption) =>
								onChange(val.value)
							}
						/>
					)}
				/>
				{errors?.civility && (
					<Alert severity="error">{errors.civility?.message}</Alert>
				)}
			</div>
			<Controller
				name="name"
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
			<Controller
				name="firstName"
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
				name="phone"
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
				name="email"
				control={control}
				defaultValue=""
				render={({ field: { onChange, value } }) => (
					<TextField
						type="email"
						required
						value={value}
						onChange={onChange}
						label="Email"
						variant="outlined"
						autoComplete="email"
					/>
				)}
			/>
			<div className="MuiFormControl-root">
				<Controller
					name="dateOfBirth"
					control={control}
					rules={{
						required: "La date de naissance est requise",
					}}
					render={({ field: { onChange, value } }) => (
						<TextField
							label="Date de naissance"
							type="date"
							inputProps={{
								pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
								max: "2100-01-01",
							}}
							className="hide-calendar"
							onChange={onChange}
							onClick={evt => evt.preventDefault()}
							value={value || new Date("0000-00-00")}
							required
						/>
					)}
				/>
				{errors?.dateOfBirth && (
					<Alert severity="error">{errors.dateOfBirth.message}</Alert>
				)}
			</div>
			<Controller
				name="postalCode"
				defaultValue=""
				control={control}
				render={({ field: { onChange, value } }) => (
					<TextField
						label="Code postal"
						type="number"
						onChange={onChange}
						value={value}
						autoComplete="postal-code"
					/>
				)}
			/>

			{!isProfile && (
				<>
					<div className="MuiFormControl-root">
						<Controller
							name="password"
							rules={{
								minLength: {
									value: 8,
									message:
										"Le mot de passe doit avoir ou moins avoir 8 caractères",
								},
							}}
							control={control}
							defaultValue=""
							render={({ field: { onChange, value } }) => (
								<TextField
									type="password"
									required
									value={value}
									onChange={onChange}
									label="Mot de passe"
									variant="outlined"
									autoComplete="new-password"
								/>
							)}
						/>
						{errors?.password && (
							<Alert severity="error">
								{errors.password.message}
							</Alert>
						)}
					</div>
					<div className="MuiFormControl-root">
						<Controller
							name="confirmPassword"
							control={control}
							rules={{
								validate: value =>
									value === watch("password") ||
									"Les mots de passe ne correspondent pas",
							}}
							defaultValue=""
							render={({ field: { onChange, value } }) => (
								<TextField
									type="password"
									required
									value={value}
									onChange={onChange}
									label="Confirmation du mot de passe"
									variant="outlined"
									autoComplete="new-password"
								/>
							)}
						/>
						{errors?.confirmPassword && (
							<Alert severity="error">
								{errors.confirmPassword.message}
							</Alert>
						)}
					</div>
				</>
			)}
			<div className="MuiFormControl-root">
				<Controller
					name="internshipStartDate"
					control={control}
					rules={{
						required: "La date de début de stage est requise",
					}}
					render={({ field: { onChange, value } }) => (
						<TextField
							label="Date de début de stage"
							type="date"
							inputProps={{
								pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
								max: "2100-01-01",
							}}
							className="hide-calendar"
							onChange={onChange}
							onClick={evt => evt.preventDefault()}
							value={value || new Date("00-00-0000")}
							required
							helperText="Date préférée"
						/>
					)}
				/>
				{errors?.internshipStartDate && (
					<Alert severity="error">
						{errors.internshipStartDate.message}
					</Alert>
				)}
			</div>
			<div className="MuiFormControl-root">
				<Controller
					name="internshipEndDate"
					control={control}
					rules={{
						required: "La date de fin de stage est requise",
					}}
					render={({ field: { onChange, value } }) => (
						<TextField
							label="Date de fin de stage"
							type="date"
							inputProps={{
								pattern: "[0-9]{4}-[0-9]{2}-[0-9]{2}",
								max: "2100-01-01",
							}}
							className="hide-calendar"
							onChange={onChange}
							onClick={evt => evt.preventDefault()}
							value={value || new Date("0000-00-00")}
							required
							helperText="Date préférée"
						/>
					)}
				/>
				{errors?.internshipEndDate && (
					<Alert severity="error">
						{errors.internshipEndDate.message}
					</Alert>
				)}
			</div>
			<div className="select-form-control z-50">
				<InputLabel>Statut *</InputLabel>
				<Controller
					rules={{
						required: "Le statut est requis",
					}}
					name="internStatus"
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CustomSelect
							isSearchable
							options={statusesOptions}
							placeholder="Choisissez..."
							onBlur={onBlur}
							value={statusesOptions?.find(
								(c: ReactSelectOption) =>
									c.value === value?.value
							)}
							onChange={(val: ReactSelectOption) => onChange(val)}
						/>
					)}
				/>
				{errors?.internStatus && (
					<Alert severity="error">
						{errors.internStatus?.message}
					</Alert>
				)}
			</div>
			{(watch("internStatus")?.label === STATUS_STUDENT ||
				watch("internStatus")?.label ===
					STATUS_HIGH_SCHOOL_STUDENT) && (
				<div className="select-form-control z-30">
					<InputLabel>Métiers</InputLabel>
					<Controller
						rules={{
							required: "Au moins un métier est requis",
						}}
						name="jobs"
						control={control}
						render={({ field: { value, onChange, onBlur } }) => (
							<CustomSelect
								options={jobsOptions}
								placeholder="Choisissez..."
								isMulti
								onChange={(lOptions: ReactSelectOption[]) =>
									onChange(
										lOptions?.map(option => option.value)
									)
								}
								onBlur={onBlur}
								value={jobsOptions?.filter((option: any) =>
									value?.includes(option.value)
								)}
								defaultValue={jobsOptions?.filter(
									(option: any) =>
										value?.includes(option.value)
								)}
							/>
						)}
					/>
					{errors?.jobs && (
						<Alert severity="error">{errors.jobs.message}</Alert>
					)}
				</div>
			)}
			{watch("internStatus")?.label === STATUS_STUDENT && (
				<>
					<div className="select-form-control--half-second z-20">
						<InputLabel>Durée du stage</InputLabel>
						<Controller
							rules={{
								required: "La durée du stage est requise",
							}}
							name="internshipPeriod"
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									isSearchable
									options={STUDENT_PERIOD_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={STUDENT_PERIOD_OPTIONS.find(
										(c: ReactSelectOption) =>
											c.value === value
									)}
									onChange={(val: ReactSelectOption) =>
										onChange(val.value)
									}
								/>
							)}
						/>
						{errors?.internshipPeriod && (
							<Alert severity="error">
								{errors.internshipPeriod.message}
							</Alert>
						)}
					</div>
					<div className="select-form-control--half-second z-10">
						<InputLabel>Diplome</InputLabel>
						<Controller
							rules={{
								required: "Le diplome est requis",
							}}
							name="diploma"
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									isSearchable
									options={DIPLOMA_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={DIPLOMA_OPTIONS.find(
										(c: ReactSelectOption) =>
											c.value === value
									)}
									onChange={(val: ReactSelectOption) =>
										onChange(val.value)
									}
								/>
							)}
						/>
						{errors?.diploma && (
							<Alert severity="error">
								{errors.diploma.message}
							</Alert>
						)}
					</div>
				</>
			)}
			<div className="file-control">
				<PdfUpload
					register={register("cv")}
					id="cv"
					accept=".pdf"
					text="Importer un CV"
					value={watch("cv")}
					setValue={setValue}
				/>
				<FormHelperText>pdf only</FormHelperText>
			</div>

			<div className="file-control">
				<PdfUpload
					register={register("coverLetter")}
					id="coverLetter"
					accept=".pdf"
					text="Importer une lettre de motivation"
					value={watch("coverLetter")}
					setValue={setValue}
				/>
				<FormHelperText>pdf only</FormHelperText>
			</div>
		</>
	)
}
export default UserControls
