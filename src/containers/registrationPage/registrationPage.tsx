import { Alert, Button, InputLabel, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import Activity from "../../apis/models/activity"
import Job from "../../apis/models/job"
import ReactSelectOption from "../../apis/models/reactSelectOption"
import User from "../../apis/models/user"
import activityService from "../../apis/services/activityService"
import jobService from "../../apis/services/jobService"
import userService from "../../apis/services/userService"
import CustomSelect from "../../components/inputs/customSelect"

import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.svg"
import {
	CIVILITY_OPTIONS,
	DIPLOMA_OPTIONS,
	PERIOD_OPTIONS,
	STATUS_OPTIONS,
} from "./constants"

function RegistrationPage() {
	useHideElement(["sidebar", "header", "footer"])

	const [activitiesOptions, setActivitiesOptions] =
		useState<Array<ReactSelectOption>>()
	const [jobsOptions, setJobsOptions] = useState<Array<ReactSelectOption>>()

	const navigate = useNavigate()
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm()

	const postRegister = useMutation(
		(newCompany: User) => userService.register(newCompany),
		{
			onSuccess: () => {
				navigate("/login")
			},
		}
	)

	useQuery("activities", () =>
		activityService.getAllWithFilters().then(res => {
			const activities: Array<ReactSelectOption> = res.map(
				(a: Activity) => ({
					label: a.name,
					value: a.id,
				})
			)
			setActivitiesOptions(activities)
		})
	)

	useQuery("jobs", () =>
		jobService.getAllWithFilters().then(res => {
			const jobs: Array<ReactSelectOption> = res.map((j: Job) => ({
				label: j.name,
				value: j.id,
			}))
			setJobsOptions(jobs)
		})
	)

	const onSubmit = (data: any) => {
		const toCreate: User = data
		if (toCreate.status === "Collégien") {
			toCreate.activities = null
			toCreate.jobs = null
			toCreate.diploma = null
			toCreate.internshipPeriod = null
		}

		if (toCreate.status === "Lycéen") {
			toCreate.diploma = null
			toCreate.internshipPeriod = null
		}

		toCreate.activities = data.activities?.map((a: any) => ({ id: a }))
		toCreate.jobs = data.jobs?.map((j: any) => ({ id: j }))
		postRegister.mutate(toCreate)
	}

	return (
		<section className="registration">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="registration-form"
			>
				<Typography variant="h4" mb={2}>
					Inscription
				</Typography>
				<img src={logo} alt="logo" />
				<div className="registration-form--scroll">
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
									defaultValue="2000-01-01"
									onChange={onChange}
									value={value}
									required
								/>
							)}
						/>
						{errors?.dateOfBirth && (
							<Alert severity="error">
								{errors.dateOfBirth.message}
							</Alert>
						)}
					</div>
					<Controller
						name="postalCode"
						control={control}
						render={({ field: { onChange, value } }) => (
							<TextField
								label="Code postal"
								type="number"
								defaultValue="69000"
								onChange={onChange}
								value={value}
							/>
						)}
					/>
					<div className="select-form-control">
						<InputLabel>Civilité</InputLabel>
						<Controller
							rules={{
								required: "La civilité est requise",
							}}
							name="civility"
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									isSearchable
									options={CIVILITY_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={CIVILITY_OPTIONS.find(
										(c: ReactSelectOption) =>
											c.value === value
									)}
									onChange={(val: ReactSelectOption) =>
										onChange(val.value)
									}
								/>
							)}
						/>
						{errors?.civility && (
							<Alert severity="error">
								{errors.civility.message}
							</Alert>
						)}
					</div>
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
					</div>
					<div className="select-form-control">
						<InputLabel>Status</InputLabel>
						<Controller
							rules={{
								required: "Le status est requis",
							}}
							name="status"
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									isSearchable
									options={STATUS_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={STATUS_OPTIONS.find(
										(c: ReactSelectOption) =>
											c.value === value
									)}
									onChange={(val: ReactSelectOption) =>
										onChange(val.value)
									}
								/>
							)}
						/>
						{errors?.civility && (
							<Alert severity="error">
								{errors.civility.message}
							</Alert>
						)}
					</div>
					{(watch("status") === "Etudiant" ||
						watch("status") === "Lycéen" ||
						watch("status") === "Demandeur d'emploi") && (
						<>
							<div className="select-form-control--half-first">
								<InputLabel>Activités</InputLabel>
								<Controller
									rules={{
										required:
											"Au moins une activité est requise",
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
											onChange={(
												lOptions: ReactSelectOption[]
											) =>
												onChange(
													lOptions?.map(
														option => option.value
													)
												)
											}
											onBlur={onBlur}
											value={activitiesOptions?.filter(
												(option: any) =>
													value?.includes(
														option.value
													)
											)}
											defaultValue={activitiesOptions?.filter(
												(option: any) =>
													value?.includes(
														option.value
													)
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
										required:
											"Au moins un métier est requis",
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
											onChange={(
												lOptions: ReactSelectOption[]
											) =>
												onChange(
													lOptions?.map(
														option => option.value
													)
												)
											}
											onBlur={onBlur}
											value={jobsOptions?.filter(
												(option: any) =>
													value?.includes(
														option.value
													)
											)}
											defaultValue={jobsOptions?.filter(
												(option: any) =>
													value?.includes(
														option.value
													)
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
					{(watch("status") === "Etudiant" ||
						watch("status") === "Demandeur d'emploi") && (
						<>
							<div className="select-form-control--half-second">
								<InputLabel>Durée du stage</InputLabel>
								<Controller
									rules={{
										required:
											"La durée du stage est requis",
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
											onChange={(
												val: ReactSelectOption
											) => onChange(val.value)}
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
											onChange={(
												val: ReactSelectOption
											) => onChange(val.value)}
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
				</div>
				<Button type="submit">S'inscrire</Button>
				<span className="registration-form-registration">
					Déja inscrit? <Link to="/login">Se connecter</Link>
				</span>
			</form>
		</section>
	)
}

export default RegistrationPage
