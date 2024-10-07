/* eslint-disable react/jsx-no-bind */
import { Button } from "@mui/material"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"

import WarningIcon from "@mui/icons-material/Warning"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import Activity from "../../api/models/activity"
import Job from "../../api/models/job"
import ReactSelectOption from "../../api/models/reactSelectOption"
import User from "../../api/models/user"
import userService from "../../api/services/userService"

import FileDb from "../../api/models/fileDb"
import UserControls from "../../components/controls/userControls"
import UserContext from "../../contexts/user"
import profile from "../../resources/images/profile.svg"

import InternStatus from "../../api/models/internStatus"
import useJobsQuery from "../../hooks/useJobsQuery"
import useStatusesQuery from "../../hooks/useStatusesQuery"
import {
	STATUS_COLLEGE_STUDENT,
	STATUS_HIGH_SCHOOL_STUDENT,
} from "../../utils/constants"
import { exportItem } from "../../utils/exportUtil"

function ProfilePage() {
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
				lUser.jobs = data.jobs
				lUser.internStatus = data.internStatus
				setUser(lUser)
				localStorage.setItem("user", JSON.stringify(lUser))
				apiUser.refetch()
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

	const { jobs } = useJobsQuery()

	const { statuses } = useStatusesQuery()

	const onSubmit = (data: any) => {
		const formData = new FormData()
		const toUpdate: User = { ...data }

		if (data.internStatus.label === STATUS_COLLEGE_STUDENT) {
			toUpdate.jobs = null
			toUpdate.diploma = null
			toUpdate.internshipPeriod = null
		} else {
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

	const exportData = () => {
		exportItem(apiUser.data, `export_${apiUser.data.email}_${Date.now()}`)
	}

	return (
		<section className="page profile">
			<img src={profile} alt="profile" />
			<Button type="button" onClick={() => exportData()}>
				Télécharger les données
			</Button>
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
					jobsOptions={jobs?.data}
					statusesOptions={statuses?.data}
					control={control}
					watch={watch}
					errors={errors}
					register={register}
					setValue={setValue}
					isProfile
				/>
				<Button type="submit">Mettre à jour</Button>
				<div className="w-[80%]  tablet:w-full">
				<p>
					Conformément à l’article <b>17</b> du{" "}
					<b>
					Règlement Général sur la Protection des Données
					Personnelles (RGPD)
					</b>{" "}
					relative au droit à l’oubli, pour toute demande de
					suppression de compte utilisateur du site JobExplorer, merci
					de nous envoyer un mail à{" "}
					<a href="mailto:jobexplorers@eedk.fr">
					jobexplorer@eedk.fr
					</a>
					:
				</p>
					<div className="pt-2 text-sm">
						➔ [ <b>Objet du mail</b>: Demande suppression compte
						utilisateur JobExplorer ]
					</div>
					<div className="text-sm">
						➔ | <b>Corps du mail</b> : Pouvez-vous supprimer mon
						compte utilisateur, voici mon <i>nom</i>: XXX ,{" "}
						<i>mon prénom</i> : ZZZ et mon <i>adresse mail</i> :
						123@---.fr |
					</div>
				</div>
			</form>
		</section>
	)
}

export default ProfilePage
