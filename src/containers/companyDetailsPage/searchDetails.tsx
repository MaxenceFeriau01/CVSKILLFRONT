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
import {
	PERIOD_OPTIONS,
	STATUS_COLLEGE_STUDENT,
	STATUS_HIGH_SCHOOL_STUDENT,
	STATUS_JOB_SEEKER,
	STATUS_OPTIONS,
	STATUS_STUDENT,
} from "../../utils/constants"
import { INTERN_NUMBER_OPTIONS, INPUT_FORM_THREE } from "./constants"

interface SearchDetailsProps {
	form: any
	activities: ReactSelectOption[] | undefined
}
function SearchDetails({ form, activities }: SearchDetailsProps) {
	const {
		control,
		watch,
		formState: { errors },
	} = form
	const [jobs, setJobs] = useState<Array<ReactSelectOption>>()

	function handleCheck(value: ReactSelectOption) {
		const newValues =
			watch(INPUT_FORM_THREE[0])?.filter(
				(e: any) => e?.value === value.value
			).length > 0
				? watch(INPUT_FORM_THREE[0])?.filter(
						(v: any) => v.value !== value.value
				  )
				: [...(watch(INPUT_FORM_THREE[0]) ?? []), value]
		return newValues
	}

	useQuery("jobs", () =>
		jobService.getAllWithFilters().then(res => {
			setJobs(res.map((a: Job) => new ReactSelectOption(a.id, a.name)))
		})
	)

	function isStatusChecked(value: number) {
		let isChecked = false

		watch(INPUT_FORM_THREE[0])?.forEach((element: any) => {
			if (element.value === value) {
				isChecked = true
			}
		})
		return isChecked
	}

	return (
		<>
			<div className="company-details-form-stepper--intern-type">
				<h4>Quel type de stagiaires acceptez-vous d’accueillir ? *</h4>
				<Controller
					name={INPUT_FORM_THREE[0]}
					control={control}
					rules={{
						required: "Le type de stagiaires est requis",
					}}
					render={({ field: { onChange, value } }) => (
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
												checked={isStatusChecked(
													+s.value
												)}
												onChange={() =>
													onChange(handleCheck(s))
												}
											/>
										}
										label={s.label}
									/>

									<InternStatusChoice
										onChange={onChange}
										value={value}
										internTypeLabel={s.label}
										form={form}
										// eslint-disable-next-line react/jsx-no-bind
										isStatusChecked={isStatusChecked}
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
					accueillir des stagiaires ? *
				</h4>
				<Controller
					name={INPUT_FORM_THREE[1]}
					rules={{
						required: "Le domaine activité est requis",
					}}
					control={control}
					render={({ field: { value, onChange } }) => (
						<CustomSelect
							options={activities}
							placeholder="Choisissez..."
							isMulti
							onChange={(lOptions: ReactSelectOption[]) =>
								onChange(lOptions?.map(option => option.value))
							}
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
					render={({ field: { value, onChange } }) => (
						<CustomSelect
							options={jobs}
							placeholder="Choisissez..."
							isMulti
							onChange={(lOptions: ReactSelectOption[]) =>
								onChange(lOptions?.map(option => option.value))
							}
							value={jobs?.filter((option: any) =>
								value?.includes(option.value)
							)}
							defaultValue={activities?.filter((option: any) =>
								value?.includes(option.value)
							)}
						/>
					)}
				/>
				{errors[INPUT_FORM_THREE[2]] && (
					<Alert severity="error">
						{errors[INPUT_FORM_THREE[2]].message}
					</Alert>
				)}
			</div>

			<div className="select">
				<h4>
					Acceptez-vous de prendre des stagiaires de longues durée,
					rémunérés ? *
				</h4>

				<Controller
					name={INPUT_FORM_THREE[3]}
					rules={{
						required: "Ce champ est requis",
					}}
					control={control}
					render={({ field: { onChange, value } }) => (
						<RadioGroup value={value} onChange={onChange}>
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
				<h4>Combien de stagiaires pouvez-vous accueillir par an ? *</h4>
				<Controller
					name={INPUT_FORM_THREE[4]}
					rules={{
						required: "Le nombre de stagiaires est requis",
					}}
					control={control}
					render={({ field: { value, onChange } }) => (
						<CustomSelect
							options={INTERN_NUMBER_OPTIONS}
							placeholder="Choisissez..."
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

function InternStatusChoice({
	internTypeLabel,
	form,
	value,
	onChange,
	isStatusChecked,
}: any) {
	function selectedPeriod(val: number) {
		const selectedOption = value.find(
			(element: any) => element.value === val
		)

		if (selectedOption !== null)
			return new ReactSelectOption(
				selectedOption.period,
				selectedOption.period
			)

		return null
	}
	const { watch } = form
	function handleSelectChange(
		selectedInternTypeLabel: string,
		periodOption: ReactSelectOption
	) {
		const arrayOfInternsType = watch(INPUT_FORM_THREE[0])
		watch(INPUT_FORM_THREE[0]).forEach((element: any) => {
			if (element.label === selectedInternTypeLabel) {
				// eslint-disable-next-line no-param-reassign
				element.period = periodOption.value
			}
		})
		return arrayOfInternsType
	}

	return (
		<div className="internal-status-choice-container">
			{internTypeLabel === STATUS_COLLEGE_STUDENT &&
				value?.length > 0 &&
				isStatusChecked(+STATUS_OPTIONS[0].value) && (
					<i> ➔ {STATUS_OPTIONS[0].period} </i>
				)}
			{internTypeLabel === STATUS_HIGH_SCHOOL_STUDENT &&
				value?.length > 0 &&
				isStatusChecked(+STATUS_OPTIONS[1].value) && (
					<i>➔ {STATUS_OPTIONS[1].period}</i>
				)}

			{internTypeLabel === STATUS_STUDENT &&
				value?.length > 0 &&
				isStatusChecked(+STATUS_OPTIONS[2].value) && (
					<div className="select under-select">
						<span>➔</span>
						<CustomSelect
							required
							className="w-100"
							options={PERIOD_OPTIONS}
							placeholder="Choisissez..."
							value={selectedPeriod(+STATUS_OPTIONS[2].value)}
							onChange={(val: ReactSelectOption) =>
								onChange(
									handleSelectChange(
										STATUS_OPTIONS[2].label,
										val
									)
								)
							}
						/>
					</div>
				)}

			{internTypeLabel === STATUS_JOB_SEEKER &&
				value?.length > 0 &&
				isStatusChecked(+STATUS_OPTIONS[3].value) && (
					<div className="select under-select">
						<span>➔</span>
						<CustomSelect
							required
							className="w-100"
							options={PERIOD_OPTIONS}
							placeholder="Choisissez..."
							value={selectedPeriod(+STATUS_OPTIONS[3].value)}
							onChange={(val: ReactSelectOption) =>
								onChange(
									handleSelectChange(
										STATUS_OPTIONS[3].label,
										val
									)
								)
							}
						/>
					</div>
				)}
		</div>
	)
}

export default SearchDetails
