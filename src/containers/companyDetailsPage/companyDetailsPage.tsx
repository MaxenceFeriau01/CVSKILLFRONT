import { Alert, Box, Button, Step, StepButton, Stepper } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Company from "../../api/models/company"

import companyService from "../../api/services/companyService"
import Activity from "../../api/models/activity"

import { MAX_STEP_NUMBER, STEPS } from "./constants"
import CompanyGeneralDetails from "./companyGeneralDetails"
import CompanyContactDetails from "./companyContactDetails"

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
	const [activeStep, setActiveStep] = useState(0)

	const handleNext = () => {
		const newActiveStep = activeStep + 1
		setActiveStep(newActiveStep)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const handleStep = (step: number) => () => {
		setActiveStep(step)
	}

	const form = useForm()

	useQuery(
		"company",
		() =>
			companyService.getById(id).then((res: Company) => {
				form.setValue("contactFirstName", res.contactFirstName)
				form.setValue("contactLastName", res.contactLastName)
				form.setValue("contactNum", res.contactNum)
				form.setValue("contactMail", res.contactMail)
				form.setValue("siret", res.siret)
				form.setValue("name", res.name)
				form.setValue("description", res.description)
				const activities = res.activities.map((a: Activity) => a.id)
				form.setValue("activities", activities, {
					shouldValidate: true,
				})
				if (res.logo) {
					setImg({
						file: null,
						src: `data:image/png;base64,${res.logo}`,
						alt: "Logo",
					})
				}
			}),
		{ enabled: id !== undefined }
	)

	const postCompany = useMutation(
		(newCompany: any) => companyService.post(newCompany),
		{
			onSuccess: () => {
				navigate("/companies")
			},
		}
	)

	const putCompany = useMutation(
		({ companyId, companyToUpdate }: PutCompany) =>
			companyService.put(companyToUpdate, companyId)
	)

	const onSubmit = (data: any) => {
		const formData = new FormData()
		const newCompany = data
		newCompany.activities = data.activities.map((a: any) => ({ id: a }))
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
			<Stepper
				className="stepper"
				activeStep={activeStep}
				alternativeLabel
				nonLinear
			>
				{STEPS.map((step, index) => (
					<Step key={step}>
						<StepButton
							color="secondary"
							onClick={handleStep(index)}
						>
							{step}
						</StepButton>
					</Step>
				))}
			</Stepper>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="content company-details-form"
			>
				<section className="company-details-form-stepper">
					{activeStep === 0 && <CompanyGeneralDetails form={form} />}
					{activeStep === 1 && <CompanyContactDetails form={form} />}
				</section>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						pt: 2,
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

					<Button
						disabled={activeStep === MAX_STEP_NUMBER - 1}
						onClick={handleNext}
						sx={{ mr: 1 }}
					>
						Suivant
					</Button>
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
