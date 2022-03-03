import {
	Alert,
	FormGroup,
	InputLabel,
	TextField,
	Typography,
} from "@mui/material"
import { useState } from "react"
import { Controller } from "react-hook-form"

import { useQuery } from "react-query"
import activityService from "../../api/services/activityService"

import ImagePreview from "../../components/inputs/imagePreview"
import Activity from "../../api/models/activity"
import ReactSelectOption from "../../api/models/reactSelectOption"
import CustomSelect from "../../components/inputs/customSelect"
import { TYPE_COMPANY_OPTIONS } from "./constants"

function CompanyGeneralDetails({ form }: any) {
	const [options, setOptions] = useState<any>()
	const [{ alt, src }, setImg] = useState({
		file: null,
		src: "",
		alt: "logo",
	})

	const {
		register,
		control,
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

	return (
		<>
			<div className="select" style={{ zIndex: 4 }}>
				<InputLabel>Êtes vous?</InputLabel>
				<Controller
					rules={{
						required: "Le type d'entreprise est requis",
					}}
					name="type"
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CustomSelect
							isSearchable
							options={TYPE_COMPANY_OPTIONS}
							placeholder="Choisissez..."
							onBlur={onBlur}
							value={TYPE_COMPANY_OPTIONS.find(
								(c: ReactSelectOption) => c.value === value
							)}
							onChange={(val: ReactSelectOption) =>
								onChange(val.value)
							}
						/>
					)}
				/>
				{errors?.civility && (
					<Alert severity="error">{errors.civility.message}</Alert>
				)}
			</div>
			<div className="image-control">
				<ImagePreview
					img={{ alt, src }}
					setImg={setImg}
					register={register}
				/>
			</div>
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
				{/* TODO rule on length */}
				<Controller
					name="siret"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							label="Siret"
							type="number"
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
						className="form-control-full"
					/>
				)}
			/>

			<div className="select">
				<InputLabel>Domaine d'activitées</InputLabel>
				<Controller
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
			</div>
		</>
	)
}

export default CompanyGeneralDetails
