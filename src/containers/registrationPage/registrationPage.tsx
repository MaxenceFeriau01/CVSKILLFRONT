import { Alert, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import Activity from "../../api/models/activity"
import Job from "../../api/models/job"
import ReactSelectOption from "../../api/models/reactSelectOption"
import User from "../../api/models/user"
import activityService from "../../api/services/activityService"
import jobService from "../../api/services/jobService"
import userService from "../../api/services/userService"

import logo from "../../resources/images/logo.svg"
import useHideElement from "../../hooks/hideElement"
import UserControls from "../../components/controls/userControls"
import { STATUS_COLLEGE_STUDENT } from "../../utils/constants"
import InternStatus from "../../api/models/internStatus"
import internStatusService from "../../api/services/internStatusService"

function RegistrationPage() {
	useHideElement(["header", "footer"])

	const [activitiesOptions, setActivitiesOptions] =
		useState<Array<ReactSelectOption>>()
	const [jobsOptions, setJobsOptions] = useState<Array<ReactSelectOption>>()

	const navigate = useNavigate()
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		register,
	} = useForm()

	const postRegister = useMutation(
		(newUser: FormData) => userService.register(newUser),
		{
			onSuccess: () => {
				navigate("/login")
			},
		}
	)

	useQuery("activities", () =>
		activityService.getAllWithFilters().then(res => {
			const activities: Array<ReactSelectOption> = res.map(
				(a: Activity) => new ReactSelectOption(a.id, a.name)
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

	const getStatuses = useQuery("statuses", () =>
		internStatusService
			.getAllWithFilters()
			.then(res =>
				res
					.sort((a, b) => a.id - b.id)
					.map(
						(s: InternStatus) => new ReactSelectOption(s.id, s.name)
					)
			)
	)

	const onSubmit = (data: any) => {
		const formData = new FormData()

		const toCreate: User = { ...data }

		if (data.internStatus.label === STATUS_COLLEGE_STUDENT) {
			toCreate.activities = null
			toCreate.jobs = null
			toCreate.diploma = null
			toCreate.internshipPeriod = null
		} else {
			toCreate.activities = data.activities?.map((a: any) => ({ id: a }))
			toCreate.jobs = data.jobs?.map((j: any) => ({ id: j }))
		}

		toCreate.activities = data.activities?.map((a: any) => ({ id: a }))
		toCreate.jobs = data.jobs?.map((j: any) => ({ id: j }))
		toCreate.internStatus = new InternStatus(
			data.internStatus?.value,
			data.internStatus?.label
		)

		toCreate.cv = null
		toCreate.coverLetter = null

		formData.append("user", JSON.stringify(toCreate))
		formData.append("cv", data.cv?.length > 0 ? data.cv[0] : null)
		formData.append(
			"coverLetter",
			data.coverLetter?.length > 0 ? data.coverLetter[0] : null
		)

		postRegister.mutate(formData)
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
					<UserControls
						jobsOptions={jobsOptions}
						activitiesOptions={activitiesOptions}
						statusesOptions={getStatuses?.data && getStatuses.data}
						control={control}
						watch={watch}
						errors={errors}
						register={register}
					/>
				</div>
				<Button type="submit">S'inscrire</Button>
				{Object.keys(errors).length !== 0 && (
					<Alert severity="error" className="m-auto">
						Il y a des informations manquantes
					</Alert>
				)}
				<span className="registration-form-registration">
					Déja inscrit? <Link to="/login">Se connecter</Link>
				</span>
			</form>
		</section>
	)
}

export default RegistrationPage
