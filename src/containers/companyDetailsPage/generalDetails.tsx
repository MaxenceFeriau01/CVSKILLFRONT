/* eslint-disable dot-notation */
import {
	Alert,
	FormGroup,
	FormHelperText,
	InputLabel,
	TextField,
} from "@mui/material"
import { Controller } from "react-hook-form"

import ImagePreview from "../../components/inputs/imagePreview"
import ReactSelectOption from "../../api/models/reactSelectOption"
import CustomSelect from "../../components/inputs/customSelect"
import { TYPE_COMPANY_OPTIONS, INPUT_FORM_ONE } from "./constants"

interface GeneralDetailsProps {
	form: any
	activities: ReactSelectOption[] | undefined
	img: any
	setImg: any
}

function GeneralDetails({
	form,
	activities,
	img,
	setImg,
}: GeneralDetailsProps) {
	const { alt, src } = img

	const {
		register,
		control,
		formState: { errors },
	} = form
	return (
		<>
			<div className="select" style={{ zIndex: 4 }}>
				<InputLabel>Êtes vous? *</InputLabel>
				<Controller
					rules={{
						required: "Le type d'entreprise est requis",
					}}
					name={INPUT_FORM_ONE[0]}
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
				{errors[INPUT_FORM_ONE[0]] && (
					<Alert severity="error">
						{errors[INPUT_FORM_ONE[0]]?.message}
					</Alert>
				)}
			</div>
			<div className="image-control">
				<ImagePreview
					img={{ alt, src }}
					setImg={setImg}
					register={register}
				/>
				<FormHelperText>
					Attirer l'oeil avec votre logo !
				</FormHelperText>
			</div>
			<FormGroup row>
				<Controller
					name={INPUT_FORM_ONE[1]}
					rules={{
						required: "Le nom de la société est requis",
					}}
					control={control}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							label="Nom de la société"
							variant="outlined"
							value={value}
							onChange={onChange}
							helperText={errors[INPUT_FORM_ONE[1]]?.message}
							error={!!errors[INPUT_FORM_ONE[1]]}
						/>
					)}
				/>

				<Controller
					name={INPUT_FORM_ONE[2]}
					control={control}
					rules={{
						required: "Le numéro de siret est requis",
						minLength: {
							value: 14,
							message:
								"Le numéro de siret est composé de 14 chiffres",
						},
						maxLength: {
							value: 14,
							message:
								"Le numéro de siret est composé de 14 chiffres",
						},
					}}
					defaultValue=""
					render={({ field: { onChange, value } }) => (
						<TextField
							required
							label="Siret"
							type="number"
							variant="outlined"
							value={value}
							onChange={onChange}
							helperText={
								errors[INPUT_FORM_ONE[2]]
									? errors[INPUT_FORM_ONE[2]]?.message
									: "Composé de 14 chiffres"
							}
							error={!!errors[INPUT_FORM_ONE[2]]}
						/>
					)}
				/>
			</FormGroup>

			<div className="select">
				<InputLabel>Domaine d'activités</InputLabel>
				<Controller
					name="activities"
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CustomSelect
							options={activities}
							placeholder="Choisissez..."
							isMulti
							onChange={(lOptions: ReactSelectOption[]) =>
								onChange(lOptions?.map(option => option.value))
							}
							onBlur={onBlur}
							value={activities?.filter((option: any) =>
								value?.includes(option.value)
							)}
							defaultValue={activities?.filter((option: any) =>
								value?.includes(option.value)
							)}
						/>
					)}
				/>
			</div>
			<Controller
				name="description"
				rules={{
					maxLength: {
						value: 1024,
						message: "La description ne peut pas dépasser 1024",
					},
				}}
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
						helperText={errors?.description?.message}
						error={!!errors?.description}
					/>
				)}
			/>
		</>
	)
}

export default GeneralDetails
