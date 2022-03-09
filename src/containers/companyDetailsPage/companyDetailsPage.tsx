import { Box, Button, Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

import companyService from "../../api/services/companyService"
import Activity from "../../api/models/activity"

import {
	MAX_STEP_NUMBER,
	STEPS,
	INPUT_FORM_ONE,
	INPUT_FORM_THREE,
	INPUT_FORM_TWO,
} from "./constants"
import GeneralDetails from "./generalDetails"
import ContactDetails from "./contactDetails"
import SearchDetails from "./searchDetails"
import ReactSelectOption from "../../api/models/reactSelectOption"
import activityService from "../../api/services/activityService"
import InternStatus from "../../api/models/internStatus"
import InternType from "../../api/models/internType"

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
	const [activeStep, setActiveStep] = useState(0)

	const handleNext = () => {
		const newActiveStep = activeStep + 1
		setActiveStep(newActiveStep)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const form = useForm({ mode: "onChange" })

	useQuery("activities", () =>
		activityService.getAllWithFilters().then(res => {
			setActivities(
				res.map((a: Activity) => new ReactSelectOption(a.id, a.name))
			)
		})
	)

	useQuery(
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

	function currentValidationForm(formStep: number): Array<string> {
		switch (formStep) {
			case 0:
				return INPUT_FORM_ONE

			case 1:
				return INPUT_FORM_TWO

			case 2:
				return INPUT_FORM_THREE

			default:
				return []
		}
	}
	return (
		<section className="page company-details-page">
			<Stepper
				className="stepper"
				activeStep={activeStep}
				alternativeLabel
				nonLinear
			>
				{STEPS.map((step, index) => (
					<Step key={step} completed={activeStep > index}>
						<StepLabel>{step}</StepLabel>
					</Step>
				))}
			</Stepper>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="content company-details-form"
			>
				<div className="company-details-form-stepper">
					{activeStep === 0 && (
						<GeneralDetails
							form={form}
							activities={activities && activities}
							img={{ alt, src, file }}
							setImg={setImg}
						/>
					)}
					{activeStep === 1 && <ContactDetails form={form} />}
					{activeStep === 2 && (
						<SearchDetails
							form={form}
							activities={activities && activities}
						/>
					)}
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
					<Button
						disabled={activeStep === 0}
						onClick={handleBack}
						sx={{ mr: 1 }}
					>
						Précédent
					</Button>
					<Box sx={{ flex: "1 1 auto" }} />

					{activeStep !== 2 && (
						<Button
							disabled={activeStep === MAX_STEP_NUMBER - 1}
							onClick={async () => {
								const result = await form.trigger(
									currentValidationForm(activeStep)
								)
								if (result === true) {
									handleNext()
								}
							}}
							sx={{ mr: 1 }}
						>
							Suivant
						</Button>
					)}
					{activeStep === 2 && (
						<Button type="submit">
							{id !== undefined
								? "Mettre à jour"
								: "Créer une entreprise"}
						</Button>
					)}
				</Box>
			</form>
		</section>
	)
}

export default CompanyDetailsPage
