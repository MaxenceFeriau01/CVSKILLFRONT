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
import { Controller } from "react-hook-form"

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

interface PutCompany {
	companyToUpdate: FormData
	companyId: string
}

function CompanyGeneralDetails({ form }: any) {
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
	} = form

	useQuery("activities", () =>
		activityService.getAllWithFilters().then(res => {
			const activities = res.map((a: Activity) => ({
				label: a.name,
				value: a.id,
			}))
			setOptions(activities)
		})
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
		<>
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
								onChange(lOptions?.map(option => option.value))
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
					<Alert severity="error">{errors.activities.message}</Alert>
				)}
			</div>
		</>
	)
}

export default CompanyGeneralDetails
