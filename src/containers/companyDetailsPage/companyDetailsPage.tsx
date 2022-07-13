import { Box, Button } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

import WarningIcon from "@mui/icons-material/Warning"
import Activity from "../../api/models/activity"
import companyService from "../../api/services/companyService"

import InternStatus from "../../api/models/internStatus"
import InternType from "../../api/models/internType"
import ReactSelectOption from "../../api/models/reactSelectOption"
import activityService from "../../api/services/activityService"
import ContactDetails from "./contactDetails"
import GeneralDetails from "./generalDetails"
import SearchDetails from "./searchDetails"

interface PutCompany {
	companyToUpdate: FormData
	companyId: string
}

function CompanyDetailsPage() {
	const { id } = useParams()
	const navigate = useNavigate()

	const [activities, setActivities] = useState<Array<ReactSelectOption>>()

	const [{ alt, src, file }, setImg] = useState({
		file: null,
		src: "",
		alt: "logo",
	})

	const form = useForm({ mode: "onChange" })

	useQuery("activities", () =>
		activityService.getAllWithFilters().then(res => {
			setActivities(
				res.map((a: Activity) => new ReactSelectOption(a.id, a.name))
			)
		})
	)

	const apiCompany = useQuery(
		"company",
		() =>
			companyService.getById(id).then((res: any) => {
				Object.keys(res).forEach((key: string) => {
					switch (key) {
						case "activities":
						case "searchedActivities":
						case "searchedJobs":
							form.setValue(
								key,
								res[key].map((r: any) => r.id),
								{
									shouldValidate: true,
								}
							)
							break
						case "searchedInternsType":
							form.setValue(
								key,
								res[key].map((r: any) => {
									const internTypeOption = {
										value: r.internStatus.id,
										label: r.internStatus.name,
										period: r.period,
									}

									return internTypeOption
								}),
								{
									shouldValidate: true,
								}
							)
							break
						case "logo":
							if (res.logo) {
								setImg({
									file: null,
									src: `data:image/png;base64,${res.logo}`,
									alt: "Logo",
								})
							}
							break

						default:
							form.setValue(key, res[key])
							break
					}
				})
				return res
			}),
		{ enabled: id !== undefined }
	)
	const postCompany = useMutation(
		(newCompany: any) => companyService.post(newCompany),
		{
			onSuccess: () => {
				Swal.fire({
					position: "bottom-end",
					title: "",
					text: "L'entreprise a bien été créée ! ",
					icon: "success",
					timer: 1500,
				})
				navigate("/companies")
			},
		}
	)

	const putCompany = useMutation(
		({ companyId, companyToUpdate }: PutCompany) =>
			companyService.put(companyToUpdate, companyId),
		{
			onSuccess: () => {
				Swal.fire({
					position: "bottom-end",
					title: "",
					text: "L'entreprise a bien été mise à jour ! ",
					icon: "success",
					timer: 1500,
				})
			},
		}
	)

	const onSubmit = (data: any) => {
		const formData = new FormData()
		const newCompany = data
		newCompany.activities = data.activities.map((a: any) => ({ id: a }))
		newCompany.searchedActivities = data.searchedActivities.map(
			(a: any) => ({
				id: a,
			})
		)
		newCompany.searchedJobs = data.searchedJobs.map((j: any) => ({
			id: j,
		}))

		newCompany.searchedInternsType = data.searchedInternsType.map(
			(t: any) =>
				new InternType(t.period, new InternStatus(t.value, t.label))
		)

		newCompany.logo = null
		if (file) {
			formData.append("logo", file)
		}

		formData.append("company", JSON.stringify(newCompany))
		if (id) putCompany.mutate({ companyId: id, companyToUpdate: formData })
		else {
			postCompany.mutate(formData)
		}
	}

	return (
		<section className="page company-details-page">
			{apiCompany?.data?.activated === false && (
				<b className="company__deactivated">
					<WarningIcon color="warning" />
					Attention cette entreprise est désactivée
				</b>
			)}
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="content company-details-form"
			>
				<div className="company-details-form-stepper">
					<GeneralDetails
						form={form}
						activities={activities && activities}
						img={{ alt, src, file }}
						setImg={setImg}
					/>
					<ContactDetails form={form} />
					<SearchDetails
						form={form}
						activities={activities && activities}
					/>
				</div>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						pt: 2,
						pb: 2,
						width: "100%",
					}}
				>
					<Box sx={{ flex: "1 1 auto" }} />

					<Button type="submit">
						{id !== undefined
							? "Mettre à jour"
							: "Créer une entreprise"}
					</Button>
				</Box>
			</form>
		</section>
	)
}

export default CompanyDetailsPage
