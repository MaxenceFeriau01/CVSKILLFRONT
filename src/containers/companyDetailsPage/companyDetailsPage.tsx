import { Box, Button } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

import WarningIcon from "@mui/icons-material/Warning"
import companyService from "../../api/services/companyService"

import City from "../../api/models/city"
import InternStatus from "../../api/models/internStatus"
import InternType from "../../api/models/internType"
import ReactSelectOption from "../../api/models/reactSelectOption"
import cityService from "../../api/services/cityService"
import useActivitiesQuery from "../../hooks/useActivitiesQuery"
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

	const [{ alt, src, file }, setImg] = useState({
		file: null,
		src: "",
		alt: "logo",
	})

	const form = useForm({ mode: "onChange" })

	const { activities } = useActivitiesQuery()

	const citiesApi = useQuery("cities", () =>
		cityService
			.getAllWithFilters()
			.then(res =>
				res.map(
					(c: City) =>
						new ReactSelectOption(
							c.id,
							`${c.postalCode}, ${c.name}`
						)
				)
			)
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
						case "city":
							form.setValue(key, res[key]?.id)
							break
						case "searchedInternsType":
							form.setValue(
								key,
								res[key].map((r: InternType) => {
									const internTypeOption = {
										value: r.internStatus.id,
										label: r.internStatus.name,
										periods: r.periods,
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
		newCompany.activities = data?.activities?.map((a: any) => ({ id: a }))
		newCompany.searchedActivities = data.searchedActivities.map(
			(a: any) => ({
				id: a,
			})
		)
		newCompany.city = new City(data.city)
		newCompany.searchedJobs = data.searchedJobs.map((j: any) => ({
			id: j,
		}))
		if (newCompany.websiteUrl === "") {
			newCompany.websiteUrl = null
		}
		newCompany.searchedInternsType = data.searchedInternsType.map(
			(t: any) =>
				new InternType(t.periods, new InternStatus(t.value, t.label))
		)
		if (newCompany.siret === "") {
			newCompany.siret = null
		}

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
						activities={activities?.data}
						img={{ alt, src, file }}
						setImg={setImg}
					/>
					<ContactDetails
						form={form}
						cities={citiesApi?.data && citiesApi.data}
					/>
					<SearchDetails form={form} activities={activities?.data} />
				</div>

				<div className="company-details-form-actions">
					<Box sx={{ flex: "1 1 auto" }} />

					<Button type="submit" className="mr-1 tablet:mr-0">
						{id !== undefined
							? "Mettre à jour"
							: "Créer une entreprise"}
					</Button>
				</div>
			</form>
		</section>
	)
}

export default CompanyDetailsPage
