/* eslint-disable react/jsx-no-bind */
import { Button } from "@mui/material"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"

import Swal from "sweetalert2"
import Activity from "../../api/models/activity"
import Job from "../../api/models/job"
import ReactSelectOption from "../../api/models/reactSelectOption"
import User from "../../api/models/user"
import activityService from "../../api/services/activityService"
import jobService from "../../api/services/jobService"
import userService from "../../api/services/userService"

import profile from "../../resources/images/profile.svg"
import UserControls from "../../components/controls/userControls"
import FileDb from "../../api/models/fileDb"
import UserContext from "../../contexts/user"

function ProfilePage() {
	const [activitiesOptions, setActivitiesOptions] =
		useState<Array<ReactSelectOption>>()
	const [jobsOptions, setJobsOptions] = useState<Array<ReactSelectOption>>()

	const { user, setUser } = useContext(UserContext)
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		register,
		setValue,
	} = useForm()

	const putUser = useMutation(
		({ id, user }: any) => userService.put(user, id),
		{
			onSuccess: (data: User) => {
				const lUser = {
					...user,
				}
				lUser.firstName = data.firstName
				lUser.name = data.name
				setUser(lUser)
				localStorage.setItem("user", JSON.stringify(lUser))
				Swal.fire({
					position: "bottom-end",
					title: "",
					text: "Votre profil a bien été mis à jour ! ",
					icon: "success",
					timer: 1500,
				})
			},
		}
	)

	useQuery("user", () =>
		userService.getUser().then((res: any) => {
			Object.keys(res).forEach((key: any) => {
				switch (key) {
					case "activities":
						setValue(
							"activities",
							res.activities.map((a: Activity) => a.id),
							{
								shouldValidate: true,
							}
						)
						break
					case "jobs":
						setValue(
							"jobs",
							res.jobs.map((j: Job) => j.id),
							{
								shouldValidate: true,
							}
						)
						break
					case "files":
						res.files?.forEach((element: FileDb) => {
							if (element.type === "CV") {
								setValue("cv", element)
							}
							if (element.type === "COVER_LETTER") {
								setValue("coverLetter", element)
							}
						})

						break
					default:
						setValue(key, res[key])
						break
				}
			})
		})
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
		const formData = new FormData()
		console.log(data)
		const toUpdate: User = { ...data }
		if (toUpdate.status === "Collégien") {
			toUpdate.activities = null
			toUpdate.jobs = null
			toUpdate.diploma = null
			toUpdate.internshipPeriod = null
		}

		if (toUpdate.status === "Lycéen") {
			toUpdate.diploma = null
			toUpdate.internshipPeriod = null
		}

		toUpdate.activities = data.activities?.map((a: any) => ({ id: a }))
		toUpdate.jobs = data.jobs?.map((j: any) => ({ id: j }))
		toUpdate.cv = null
		toUpdate.coverLetter = null

		formData.append("user", JSON.stringify(toUpdate))
		formData.append("cv", data.cv?.length > 0 ? data.cv[0] : null)
		formData.append(
			"coverLetter",
			data.coverLetter?.length > 0 ? data.coverLetter[0] : null
		)
		putUser.mutate({ id: data.id, user: formData })
	}

	return (
		<section className="page profile">
			<img src={profile} alt="profile" />
			<form onSubmit={handleSubmit(onSubmit)} className="profile-form">
				<UserControls
					jobsOptions={jobsOptions}
					activitiesOptions={activitiesOptions}
					control={control}
					watch={watch}
					errors={errors}
					register={register}
					isProfile
				/>
				<Button type="submit">Mettre à jour</Button>
			</form>
		</section>
	)
}

export default ProfilePage
