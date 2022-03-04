import {
	Box,
	Button,
	Step,
	StepButton,
	StepLabel,
	Stepper,
} from "@mui/material"
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
import CompanySearchDetails from "./companySearchDetails"

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

	const form = useForm({ mode: "onChange" })

	const { isValid } = form.formState

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
				form.setValue("town", "tst")
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
						<StepLabel>{step}</StepLabel>
					</Step>
				))}
			</Stepper>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="content company-details-form"
			>
				<div className="company-details-form-stepper">
					{activeStep === 0 && <CompanyGeneralDetails form={form} />}
					{activeStep === 1 && <CompanyContactDetails form={form} />}
					{activeStep === 2 && <CompanySearchDetails form={form} />}
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
							disabled={
								activeStep === MAX_STEP_NUMBER - 1 || !isValid
							}
							onClick={handleNext}
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
