/* eslint-disable react/jsx-no-bind */
import { Button } from "@mui/material"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"

import Swal from "sweetalert2"
import { useParams } from "react-router-dom"
import WarningIcon from "@mui/icons-material/Warning"
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

import {
	STATUS_COLLEGE_STUDENT,
	STATUS_HIGH_SCHOOL_STUDENT,
} from "../../utils/constants"
import InternStatus from "../../api/models/internStatus"
import internStatusService from "../../api/services/internStatusService"

function ProfilePage() {
	const [activitiesOptions, setActivitiesOptions] =
		useState<Array<ReactSelectOption>>()
	const [jobsOptions, setJobsOptions] = useState<Array<ReactSelectOption>>()
	const [statusesOptions, setStatusesOptions] =
		useState<Array<ReactSelectOption>>()

	const { user, setUser } = useContext(UserContext)
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		register,
		setValue,
	} = useForm()

	const { id } = useParams()

	const putUser = useMutation(
		({ userId, updatedUser }: any) => userService.put(updatedUser, userId),
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
					text: "Le profil a bien été mis à jour ! ",
					icon: "success",
					timer: 1500,
				})
			},
		}
	)

	const apiUser = useQuery("user", () => {
		let endpointToCall = userService.getSelf()
		if (id) {
			endpointToCall = userService.getById(id)
		}
		return endpointToCall.then((res: any) => {
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
					case "internStatus":
						setValue(
							"internStatus",
							new ReactSelectOption(
								res.internStatus?.id,
								res.internStatus?.name
							)
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
			return res
		})
	})

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
			const jobs: Array<ReactSelectOption> = res?.map(
				(j: Job) => new ReactSelectOption(j.id, j.name)
			)
			setJobsOptions(jobs)
		})
	)

	useQuery("statuses", () =>
		internStatusService.getAllWithFilters().then(res => {
			const is: Array<ReactSelectOption> = res.map(
				(s: InternStatus) => new ReactSelectOption(s.id, s.name)
			)
			setStatusesOptions(is)
		})
	)

	const onSubmit = (data: any) => {
		const formData = new FormData()
		const toUpdate: User = { ...data }

		if (data.internStatus.label === STATUS_COLLEGE_STUDENT) {
			toUpdate.activities = null
			toUpdate.jobs = null
			toUpdate.diploma = null
			toUpdate.internshipPeriod = null
		} else {
			toUpdate.activities = data.activities?.map((a: any) => ({ id: a }))
			toUpdate.jobs = data.jobs?.map((j: any) => ({ id: j }))
		}

		if (data.internStatus.label === STATUS_HIGH_SCHOOL_STUDENT) {
			toUpdate.diploma = null
			toUpdate.internshipPeriod = null
		}

		toUpdate.internStatus = new InternStatus(
			data.internStatus?.value,
			data.internStatus?.label
		)
		toUpdate.cv = null
		toUpdate.coverLetter = null

		formData.append("user", JSON.stringify(toUpdate))
		formData.append("cv", data.cv?.length > 0 ? data.cv[0] : null)
		formData.append(
			"coverLetter",
			data.coverLetter?.length > 0 ? data.coverLetter[0] : null
		)
		putUser.mutate({ userId: data.id, updatedUser: formData })
	}

	return (
		<section className="page profile">
			<img src={profile} alt="profile" />
			{apiUser?.data?.activated === false && (
				<b className="user__deactivated">
					<WarningIcon color="warning" />
					Attention cet utilisateur est désactivé
				</b>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="content profile-form"
			>
				<UserControls
					jobsOptions={jobsOptions}
					activitiesOptions={activitiesOptions}
					statusesOptions={statusesOptions}
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
