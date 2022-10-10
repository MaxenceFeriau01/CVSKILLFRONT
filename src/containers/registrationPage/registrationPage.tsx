import { Alert, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import Activity from "../../api/models/activity"
import Job from "../../api/models/job"
import ReactSelectOption from "../../api/models/reactSelectOption"
import activityService from "../../api/services/activityService"
import jobService from "../../api/services/jobService"
import userService from "../../api/services/userService"

import UserControls from "../../components/controls/userControls"
import useHideElement from "../../hooks/hideElement"
import useStatusesQuery from "../../hooks/useStatusesQuery"
import logo from "../../resources/images/logo.svg"
import convertFormToApiData from "./utils"

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

	const { statuses } = useStatusesQuery()

	const onSubmit = (data: any) => {
		if (data.cv?.length > 0 && data.coverLetter?.length > 0) {
			const formData = convertFormToApiData(data)
			postRegister.mutate(formData)
		} else {
			Swal.fire({
				title: "<strong><u>CV et lettre de motivation</u>?</strong>",
				icon: "info",
				html: "Il est conseillé de rajouter un <b>CV</b> et une <b>lettre de motivation</b> pour une meilleure recherche.",
				showCloseButton: true,
				showDenyButton: true,
				focusConfirm: false,
				confirmButtonText: "Remplir ces informations",
				denyButtonText: "S'inscrire tout de même",
			}).then(result => {
				if (result.isDenied) {
					const formData = convertFormToApiData(data)
					postRegister.mutate(formData)
				}
			})
		}
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
				<img src={logo} alt="logo" width="300" height="90" />
				<div className="registration-form--scroll">
					<UserControls
						jobsOptions={jobsOptions}
						activitiesOptions={activitiesOptions}
						statusesOptions={statuses?.data && statuses.data}
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
