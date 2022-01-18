import {
	Alert,
	Button,
	FormGroup,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import Company from "../../apis/models/company"
import activityService from "../../apis/services/activityService"

import companyService from "../../apis/services/companyService"
import ImagePreview from "../../components/inputs/imagePreview"
import OverlaySpinner from "../../components/spinners/overlaySpinner"
import Activity from "../../apis/models/activity"
import ReactSelectOption from "../../apis/models/reactSelectOption"
import CustomSelect from "../../components/inputs/customSelect"

interface PutCompany {
	newCompany: Company
	companyId: number
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

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm()

	const company = useQuery(
		"company",
		() =>
			companyService.getById(id).then((res: Company) => {
				setValue("contactFirstName", res.contactFirstName)
				setValue("contactLastName", res.contactLastName)
				setValue("contactNum", res.contactNum)
				setValue("contactMail", res.contactMail)
				setValue("siret", res.siret)
				setValue("name", res.name)
				setValue("description", res.description)
				const activities = res.activities.map((a: Activity) => a.id)
				setValue("activities", activities, { shouldValidate: true })
			}),
		{ enabled: id !== undefined }
	)

	useQuery("activities", () =>
		activityService.getWithFilters().then(res => {
			const activities = res.map((a: Activity) => ({
				label: a.name,
				value: a.id,
			}))
			setOptions(activities)
		})
	)

	const postCompany = useMutation(
		(newCompany: Company) => companyService.post(newCompany),
		{
			onSuccess: () => {
				navigate("/")
			},
		}
	)

	const putCompany = useMutation(({ companyId, newCompany }: PutCompany) =>
		companyService.put(newCompany, companyId)
	)

	const onSubmit = (data: any) => postCompany.mutate(data)

	return (
		<section className="page">
			{company.isFetching && <OverlaySpinner />}
			<Typography
				className="title"
				variant="h4"
				mb={2}
				mt={2}
				align="center"
			>
				Détails de la société
			</Typography>

			<form
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
								placeholder="Choose..."
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
				<Button type="submit">
					{id !== undefined
						? "Mettre à jour"
						: "Créer une entreprise"}
				</Button>
			</form>
		</section>
	)
}

export default CompanyDetailsPage
