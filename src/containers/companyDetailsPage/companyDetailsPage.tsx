import {
	Alert,
	Box,
	Button,
	FormGroup,
	InputLabel,
	makeStyles,
	Step,
	StepButton,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Company from "../../api/models/company"
import activityService from "../../api/services/activityService"

import companyService from "../../api/services/companyService"
import ImagePreview from "../../components/inputs/imagePreview"
import Activity from "../../api/models/activity"
import ReactSelectOption from "../../api/models/reactSelectOption"
import CustomSelect from "../../components/inputs/customSelect"
import HasRight from "../../components/rights/hasRight"
import Role from "../../enums/Role"
import { MAX_STEP_NUMBER, STEPS } from "./constants"
import CompanyGeneralDetails from "./companyGeneralDetails"

interface PutCompany {
	companyToUpdate: FormData
	companyId: string
}

function CompanyDetailsPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [options, setOptions] = useState<any>()
	const [{ alt, src, file }, setImg] = useState({
		file: null,
		src: "",
		alt: "logo",
	})

	const [activeStep, setActiveStep] = useState(0)
	const [completed, setCompleted] = useState<{
		[k: number]: boolean
	}>({})

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

	const company = useQuery(
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
				className="company-details-form"
			>
				{activeStep === 0 && <CompanyGeneralDetails form={form} />}

				<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
					<Button
						color="secondary"
						disabled={activeStep === 0}
						onClick={handleBack}
						sx={{ mr: 1 }}
					>
						Précédent
					</Button>
					<Box sx={{ flex: "1 1 auto" }} />

					<Button
						color="secondary"
						disabled={activeStep === MAX_STEP_NUMBER - 1}
						onClick={handleNext}
						sx={{ mr: 1 }}
					>
						Suivant
					</Button>
				</Box>
				<HasRight roles={[Role.ADMIN]}>
					<Button type="submit">
						{id !== undefined
							? "Mettre à jour"
							: "Créer une entreprise"}
					</Button>
				</HasRight>
			</form>
			{/* <form
				onSubmit={handleSubmit(onSubmit)}
				className="company-details-form"
			>
				<ImagePreview
					img={{ alt, src }}
					setImg={setImg}
					register={register}
				/>
				<FormGroup row>
					<Controller
						name="name"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								label="Name"
								variant="outlined"
								value={value}
								onChange={onChange}
								helperText="Nom de la société"
							/>
						)}
					/>

					<Controller
						name="siret"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								label="Siret"
								variant="outlined"
								value={value}
								onChange={onChange}
								helperText="Composé de 14 chiffres"
							/>
						)}
					/>
				</FormGroup>
				<Controller
					name="description"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							value={value}
							onChange={onChange}
							label="Description"
							multiline
							rows={4}
							variant="outlined"
						/>
					)}
				/>
				<Typography mt={2} mb={2} variant="h5">
					Contact
				</Typography>
				<FormGroup row>
					<Controller
						name="contactFirstName"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								value={value}
								onChange={onChange}
								label="Prénom"
								variant="outlined"
								autoComplete="given-name"
							/>
						)}
					/>
					<Controller
						name="contactLastName"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								value={value}
								onChange={onChange}
								label="Nom"
								variant="outlined"
								autoComplete="family-name"
							/>
						)}
					/>
				</FormGroup>
				<FormGroup row>
					<Controller
						name="contactNum"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								value={value}
								onChange={onChange}
								label="Telephone"
								variant="outlined"
								type="tel"
								autoComplete="tel"
							/>
						)}
					/>
					<Controller
						name="contactMail"
						control={control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								value={value}
								onChange={onChange}
								label="Email"
								variant="outlined"
								type="email"
								autoComplete="email"
							/>
						)}
					/>
				</FormGroup>
				<div className="select-activities">
					<InputLabel>Activités</InputLabel>
					<Controller
						rules={{
							required: "Au moins une activité est requise",
						}}
						name="activities"
						control={control}
						render={({ field: { value, onChange, onBlur } }) => (
							<CustomSelect
								options={options}
								placeholder="Choisissez..."
								isMulti
								onChange={(lOptions: ReactSelectOption[]) =>
									onChange(
										lOptions?.map(option => option.value)
									)
								}
								onBlur={onBlur}
								value={options?.filter((option: any) =>
									value?.includes(option.value)
								)}
								defaultValue={options?.filter((option: any) =>
									value?.includes(option.value)
								)}
							/>
						)}
					/>
					{errors?.activities && (
						<Alert severity="error">
							{errors.activities.message}
						</Alert>
					)}
				</div>
				<HasRight roles={[Role.ADMIN]}>
					<Button type="submit">
						{id !== undefined
							? "Mettre à jour"
							: "Créer une entreprise"}
					</Button>
				</HasRight>
						</form> */}
		</section>
	)
}

export default CompanyDetailsPage
