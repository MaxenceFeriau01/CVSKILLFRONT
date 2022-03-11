import { Alert, FormHelperText, InputLabel, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import ReactSelectOption from "../../api/models/reactSelectOption"
import {
	PERIOD_OPTIONS,
	STATUS_HIGH_SCHOOL_STUDENT,
	STATUS_JOB_SEEKER,
	STATUS_STUDENT,
} from "../../utils/constants"
import CustomSelect from "../inputs/customSelect"

import FileUpload from "../inputs/fileUpload"
import { CIVILITY_OPTIONS, DIPLOMA_OPTIONS } from "./constants"

interface UserControlsProps {
	control: any
	watch: any
	errors: any
	register: any // FileList | FileDb
	activitiesOptions: Array<ReactSelectOption> | undefined
	jobsOptions: Array<ReactSelectOption> | undefined
	statusesOptions: Array<ReactSelectOption> | undefined
	isProfile?: boolean
}

function UserControls({
	control,
	watch,
	errors,
	register,
	activitiesOptions,
	jobsOptions,
	statusesOptions,
	isProfile = false,
}: UserControlsProps) {
	return (
		<>
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
					defaultValue=""
					control={control}
					rules={{
						required: "La date de naissance est requise",
					}}
					render={({ field: { onChange, value } }) => (
						<TextField
							label="Date de naissance"
							type="date"
							onChange={onChange}
							value={value || "2000-01-01"}
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
			<div className="select-form-control" style={{ zIndex: 4 }}>
				<InputLabel>Civilité</InputLabel>
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
									"Les mot de passe ne correspondent pas",
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
					</div>{" "}
				</>
			)}
			<div className="select-form-control">
				<InputLabel>Status</InputLabel>
				<Controller
					rules={{
						required: "Le status est requis",
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
				watch("internStatus")?.label === STATUS_HIGH_SCHOOL_STUDENT ||
				watch("internStatus")?.label === STATUS_JOB_SEEKER) && (
				<>
					<div className="select-form-control--half-first">
						<InputLabel>Activités</InputLabel>
						<Controller
							rules={{
								required: "Au moins une activité est requise",
							}}
							name="activities"
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									disable
									options={activitiesOptions}
									placeholder="Choisissez..."
									isMulti
									onChange={(lOptions: ReactSelectOption[]) =>
										onChange(
											lOptions?.map(
												option => option.value
											)
										)
									}
									onBlur={onBlur}
									value={activitiesOptions?.filter(
										(option: any) =>
											value?.includes(option.value)
									)}
									defaultValue={activitiesOptions?.filter(
										(option: any) =>
											value?.includes(option.value)
									)}
								/>
							)}
						/>
						{errors?.activities && (
							<Alert severity="error">
								{errors.activities.message}
							</Alert>
						)}
					</div>
					<div className="select-form-control--half-first">
						<InputLabel>Métiers</InputLabel>
						<Controller
							rules={{
								required: "Au moins un métier est requis",
							}}
							name="jobs"
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									options={jobsOptions}
									placeholder="Choisissez..."
									isMulti
									onChange={(lOptions: ReactSelectOption[]) =>
										onChange(
											lOptions?.map(
												option => option.value
											)
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
							<Alert severity="error">
								{errors.jobs.message}
							</Alert>
						)}
					</div>
				</>
			)}
			{(watch("internStatus")?.label === STATUS_STUDENT ||
				watch("internStatus")?.label === STATUS_JOB_SEEKER) && (
				<>
					<div className="select-form-control--half-second">
						<InputLabel>Durée du stage</InputLabel>
						<Controller
							rules={{
								required: "La durée du stage est requis",
							}}
							name="internshipPeriod"
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									isSearchable
									options={PERIOD_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={PERIOD_OPTIONS.find(
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
					<div className="select-form-control--half-second">
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
				<FileUpload
					register={register("cv")}
					id="cv"
					accept=".pdf"
					text="Importer un CV"
					value={watch("cv")}
				/>
				<FormHelperText>pdf only</FormHelperText>
			</div>

			<div className="file-control">
				<FileUpload
					register={register("coverLetter")}
					id="coverLetter"
					accept=".pdf"
					text="Importer une lettre de motivation"
					value={watch("coverLetter")}
				/>
				<FormHelperText>pdf only</FormHelperText>
			</div>
		</>
	)
}
export default UserControls
