import { Alert, Button, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import userService from "../../api/services/userService"

import UserControls from "../../components/controls/userControls"
import useHideElement from "../../hooks/hideElement"
import useJobsQuery from "../../hooks/useJobsQuery"
import useStatusesQuery from "../../hooks/useStatusesQuery"
import logo from "../../resources/images/LOGO_JOBEXPLORER.png"
import convertFormToApiData from "./utils"

function RegistrationPage() {
	useHideElement(["header", "footer"])

	const navigate = useNavigate()
	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		register,
		setValue,
	} = useForm()

	const postRegister = useMutation(
		(newUser: FormData) => userService.register(newUser),
		{
			onSuccess: () => {
				navigate("/login")
			},
		}
	)

	const { jobs } = useJobsQuery()

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
						setValue={setValue}
						jobsOptions={jobs?.data}
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
