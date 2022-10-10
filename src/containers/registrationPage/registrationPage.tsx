import { Alert, Button, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import User from "../../api/models/user"
import userService from "../../api/services/userService"

import InternStatus from "../../api/models/internStatus"
import UserControls from "../../components/controls/userControls"
import useHideElement from "../../hooks/hideElement"
import useActivitiesQuery from "../../hooks/useActivitiesQuery"
import useJobsQuery from "../../hooks/useJobsQuery"
import useStatusesQuery from "../../hooks/useStatusesQuery"
import logo from "../../resources/images/logo.svg"
import { STATUS_COLLEGE_STUDENT } from "../../utils/constants"

function RegistrationPage() {
	useHideElement(["header", "footer"])

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
	const { activities } = useActivitiesQuery()

	const { jobs } = useJobsQuery()

	const { statuses } = useStatusesQuery()

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
				<img src={logo} alt="logo" width="300" height="90" />
				<div className="registration-form--scroll">
					<UserControls
						jobsOptions={jobs?.data}
						activitiesOptions={activities?.data}
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
