import {
	Alert,
	FormControlLabel,
	Checkbox,
	Radio,
	RadioGroup,
} from "@mui/material"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { useQuery } from "react-query"
import Job from "../../api/models/job"
import ReactSelectOption from "../../api/models/reactSelectOption"
import jobService from "../../api/services/jobService"
import CustomSelect from "../../components/inputs/customSelect"
import { PERIOD_OPTIONS, STATUS_OPTIONS } from "../../utils/constants"
import { INTERN_NUMBER_OPTIONS, INPUT_FORM_THREE } from "./constants"

function SearchDetails({ form, activities }: any) {
	const {
		control,
		watch,
		formState: { errors },
	} = form
	const [checkedValues, setCheckedValues] = useState<string[]>([])
	const [jobs, setJobs] = useState<Array<ReactSelectOption>>()

	function handleCheck(value: ReactSelectOption) {
		const newValues =
			checkedValues?.filter(e => e === value.value).length > 0
				? checkedValues?.filter(v => v !== value.value)
				: [...(checkedValues ?? []), value.value.toString()]
		setCheckedValues(newValues)
		return newValues
	}

	useQuery("jobs", () =>
		jobService.getAllWithFilters().then(res => {
			setJobs(
				res.map((a: Job) => ({
					label: a.name,
					value: a.id,
				}))
			)
		})
	)
	return (
		<>
			<div className="company-details-form-stepper--intern-type">
				<h4>Quel type de stagiaires acceptez-vous d’accueillir ?</h4>
				<Controller
					name={INPUT_FORM_THREE[0]}
					control={control}
					rules={{
						required: "Le type de stagiaires est requis",
					}}
					render={({ field: { onChange } }) => (
						<div className="company-details-form__checkbox__group ">
							{STATUS_OPTIONS?.map((s: ReactSelectOption) => (
								<div
									style={
										s.value === STATUS_OPTIONS[2].value
											? {
													zIndex: 2,
											  }
											: { zIndex: 1 }
									}
									key={s.value}
								>
									<FormControlLabel
										control={
											<Checkbox
												value={s.value}
												onChange={() =>
													onChange(handleCheck(s))
												}
											/>
										}
										label={s.label}
									/>

									<InternStatusChoice
										selectedInternStatus={watch(
											INPUT_FORM_THREE[0]
										)}
										internStatus={s.value}
										form={form}
									/>
								</div>
							))}
						</div>
					)}
				/>
				{errors[INPUT_FORM_THREE[0]] && (
					<Alert severity="error">
						{errors[INPUT_FORM_THREE[0]].message}
					</Alert>
				)}
			</div>
			<div className="select" style={{ zIndex: 3 }}>
				<h4>
					Sur quels domaines d’activités et quels métiers pouvez-vous
					accueillir des stagiaires ?
				</h4>
				<Controller
					name={INPUT_FORM_THREE[1]}
					rules={{
						required: "Le domaine activité est requis",
					}}
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
				{errors[INPUT_FORM_THREE[1]] && (
					<Alert severity="error">
						{errors[INPUT_FORM_THREE[1]].message}
					</Alert>
				)}
			</div>
			<div className="select" style={{ zIndex: 2 }}>
				<Controller
					name={INPUT_FORM_THREE[2]}
					rules={{
						required: "Le métier de recherche est requis",
					}}
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CustomSelect
							options={jobs}
							placeholder="Choisissez..."
							isMulti
							onChange={(lOptions: ReactSelectOption[]) =>
								onChange(lOptions?.map(option => option.value))
							}
							onBlur={onBlur}
							value={jobs?.filter((option: any) =>
								value?.includes(option.value)
							)}
							defaultValue={activities?.filter((option: any) =>
								value?.includes(option.value)
							)}
						/>
					)}
				/>
				{errors[INPUT_FORM_THREE[1]] && (
					<Alert severity="error">
						{errors[INPUT_FORM_THREE[1]].message}
					</Alert>
				)}
			</div>

			<div className="select">
				<h4>
					Acceptez-vous de prendre des stagiaires de longues durée,
					rémunérés ?
				</h4>

				<Controller
					name={INPUT_FORM_THREE[3]}
					rules={{
						required: "Ce champ est requis",
					}}
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<RadioGroup
							value={value}
							onChange={onChange}
							onBlur={onBlur}
						>
							<FormControlLabel
								value
								control={<Radio />}
								label="Oui"
							/>
							<FormControlLabel
								value={false}
								control={<Radio />}
								label="Non"
							/>
						</RadioGroup>
					)}
				/>
				{errors?.paidIntern && (
					<Alert severity="error">
						{errors[INPUT_FORM_THREE[3]].message}
					</Alert>
				)}
			</div>
			<div className="select">
				<h4>Combien de stagiaires pouvez-vous accueillir par an ?</h4>
				<Controller
					name={INPUT_FORM_THREE[4]}
					rules={{
						required: "Le nombre de stagiaires est requis",
					}}
					control={control}
					render={({ field: { value, onChange, onBlur } }) => (
						<CustomSelect
							options={INTERN_NUMBER_OPTIONS}
							placeholder="Choisissez..."
							onBlur={onBlur}
							value={INTERN_NUMBER_OPTIONS.find(
								(c: ReactSelectOption) => c.value === value
							)}
							onChange={(val: ReactSelectOption) =>
								onChange(val.value)
							}
						/>
					)}
				/>
				{errors?.internNumber && (
					<Alert severity="error">
						{errors[INPUT_FORM_THREE[4]].message}
					</Alert>
				)}
			</div>
		</>
	)
}

function InternStatusChoice({ selectedInternStatus, internStatus, form }: any) {
	const {
		control,
		formState: { errors },
	} = form

	console.log(selectedInternStatus)
	console.log(internStatus)
	return (
		<div className="internal-status-choice-container">
			{internStatus === STATUS_OPTIONS[0].value &&
				selectedInternStatus?.length > 0 &&
				selectedInternStatus.includes(STATUS_OPTIONS[0].value) && (
					<i> ➔ 3 à 5 jours de découverte </i>
				)}
			{internStatus === STATUS_OPTIONS[1].value &&
				selectedInternStatus?.length > 0 &&
				selectedInternStatus.includes(STATUS_OPTIONS[1].value) && (
					<i>
						➔ Bac professionnel/Technique jusqu’à 22 semaines de
						stages
					</i>
				)}

			{internStatus === STATUS_OPTIONS[2].value &&
				selectedInternStatus?.length > 0 &&
				selectedInternStatus.includes(STATUS_OPTIONS[2].value) && (
					<div className="select under-select">
						<span>➔</span>
						<Controller
							rules={{
								required: "La durée du stage est requise",
							}}
							name={INPUT_FORM_THREE[5]}
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									className="w-100"
									isSearchable
									options={PERIOD_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={PERIOD_OPTIONS.find(
										(c: ReactSelectOption) =>
											c.value === value
									)}
									onChange={(val: ReactSelectOption) =>
										onChange(val.value)
									}
								/>
							)}
						/>
						{errors[INPUT_FORM_THREE[5]] && (
							<Alert severity="error">
								{errors[INPUT_FORM_THREE[5]].message}
							</Alert>
						)}
					</div>
				)}

			{internStatus === STATUS_OPTIONS[3].value &&
				selectedInternStatus?.length > 0 &&
				selectedInternStatus.includes(STATUS_OPTIONS[3].value) && (
					<div className="select under-select">
						<span>➔</span>
						<Controller
							rules={{
								required: "La durée du stage est requise",
							}}
							name={INPUT_FORM_THREE[6]}
							control={control}
							render={({
								field: { value, onChange, onBlur },
							}) => (
								<CustomSelect
									className="w-100"
									isSearchable
									options={PERIOD_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={PERIOD_OPTIONS.find(
										(c: ReactSelectOption) =>
											c.value === value
									)}
									onChange={(val: ReactSelectOption) =>
										onChange(val.value)
									}
								/>
							)}
						/>
						{errors[INPUT_FORM_THREE[6]] && (
							<Alert severity="error">
								{errors[INPUT_FORM_THREE[6]].message}
							</Alert>
						)}
					</div>
				)}
		</div>
	)
}

export default SearchDetails
