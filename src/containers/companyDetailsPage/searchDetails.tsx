import {
	Alert,
	Checkbox,
	FormControlLabel,
	InputLabel,
	Radio,
	RadioGroup,
} from "@mui/material"
import { Controller } from "react-hook-form"
import ReactSelectOption from "../../api/models/reactSelectOption"
import CustomSelect from "../../components/inputs/customSelect"
import useJobsQuery from "../../hooks/useJobsQuery"
import useStatusesQuery from "../../hooks/useStatusesQuery"
import {
	STATUS_COLLEGE_STUDENT,
	STATUS_COLLEGE_STUDENT_PERIOD,
	STATUS_HIGH_SCHOOL_STUDENT,
	STATUS_HIGH_SCHOOL_STUDENT_PERIOD,
	STATUS_STUDENT,
	STUDENT_PERIOD_OPTIONS,
} from "../../utils/constants"
import { INPUT_FORM_THREE, INTERN_NUMBER_OPTIONS } from "./constants"

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

	const { jobs } = useJobsQuery()

	const { statuses } = useStatusesQuery()

	function handleCheck(value: ReactSelectOption) {
		if (value.label === STATUS_COLLEGE_STUDENT) {
			value.periods = [...[], STATUS_COLLEGE_STUDENT_PERIOD]
		}
		if (value.label === STATUS_HIGH_SCHOOL_STUDENT) {
			value.periods = [...[], STATUS_HIGH_SCHOOL_STUDENT_PERIOD]
		}
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

	function isStatusChecked(label: string) {
		let isChecked = false

		watch(INPUT_FORM_THREE[0])?.forEach((element: any) => {
			if (element.label === label) {
				isChecked = true
			}
		})
		return isChecked
	}

	return (
		<>
			<h3>Que recherchez-vous?</h3>
			<div className="company-details-form-stepper--intern-type">
				<div className="select">
					<h4>
						Acceptez-vous de prendre des stagiaires de moins de 18
						ans ? *
					</h4>

					<Controller
						name={INPUT_FORM_THREE[5]}
						control={control}
						defaultValue={false}
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
				</div>
				<h4>Quel type de stagiaires acceptez-vous d’accueillir ? *</h4>
				<Controller
					name={INPUT_FORM_THREE[0]}
					control={control}
					rules={{
						required: "Le type de stagiaires est requis",
					}}
					render={({ field: { onChange, value } }) => (
						<div className="company-details-form__checkbox__group ">
							{statuses?.data?.map((s: ReactSelectOption) => (
								<div
									style={
										s.value === statuses?.data[2].value
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
													s.label
												)}
												onChange={() =>
													onChange(handleCheck(s))
												}
											/>
										}
										label={s.label}
									/>

									<InternStatusChoice
										apiStatuses={statuses}
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
				<InputLabel>
					Le(s) secteur(s) d'activité recherché(s)
				</InputLabel>
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
				<InputLabel>Le(s) métier(s) recherché(s)</InputLabel>
				<Controller
					name={INPUT_FORM_THREE[2]}
					rules={{
						required: "Le métier de recherche est requis",
					}}
					control={control}
					render={({ field: { value, onChange } }) => (
						<CustomSelect
							options={jobs?.data}
							placeholder="Choisissez..."
							isMulti
							onChange={(lOptions: ReactSelectOption[]) =>
								onChange(lOptions?.map(option => option.value))
							}
							value={jobs?.data?.filter((option: any) =>
								value?.includes(option.value)
							)}
							defaultValue={jobs?.data?.filter((option: any) =>
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
					control={control}
					defaultValue={false}
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
				{errors[INPUT_FORM_THREE[4]] && (
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
	apiStatuses,
}: any) {
	function isPeriodChecked(
		selectedInternTypeLabel: string,
		label: string
	): boolean {
		let isChecked: boolean = false
		watch(INPUT_FORM_THREE[0]).forEach((element: ReactSelectOption) => {
			if (element.label === selectedInternTypeLabel) {
				element.periods?.forEach(el => {
					if (el === label) {
						isChecked = true
					}
				})
			}
		})
		return isChecked
	}
	const { watch } = form

	function checkIfOnceIsChecked(statusChecked: string) {
		return (
			watch(INPUT_FORM_THREE[0])?.find(
				(internType: ReactSelectOption) =>
					internType.label === statusChecked
			)?.periods?.length === 0 && (
				<Alert severity="error">
					Au moins un champ doit être selectionné
				</Alert>
			)
		)
	}

	function handleSelectChange(
		selectedInternType: ReactSelectOption,
		periodOption: ReactSelectOption
	) {
		const arrayOfInternsType = watch(INPUT_FORM_THREE[0])
		watch(INPUT_FORM_THREE[0]).forEach((element: ReactSelectOption) => {
			if (element.label === selectedInternType.label) {
				if (element?.periods) {
					const newValues =
						element.periods.filter(e => e === periodOption.label)
							.length > 0
							? element.periods.filter(
									v => v !== periodOption.label
							  )
							: [...(element.periods ?? []), periodOption.label]
					element.periods = newValues
				}
			}
		})
		return arrayOfInternsType
	}

	return (
		<div className="internal-status-choice-container">
			{internTypeLabel === STATUS_COLLEGE_STUDENT &&
				value?.length > 0 &&
				isStatusChecked(STATUS_COLLEGE_STUDENT) && (
					<i> ➔ {STATUS_COLLEGE_STUDENT_PERIOD} </i>
				)}
			{internTypeLabel === STATUS_HIGH_SCHOOL_STUDENT &&
				value?.length > 0 &&
				isStatusChecked(STATUS_HIGH_SCHOOL_STUDENT) && (
					<i>➔ {STATUS_HIGH_SCHOOL_STUDENT_PERIOD}</i>
				)}

			{internTypeLabel === STATUS_STUDENT &&
				value?.length > 0 &&
				isStatusChecked(STATUS_STUDENT) && (
					<div className="flex flex-col">
						{STUDENT_PERIOD_OPTIONS?.map((s: ReactSelectOption) => (
							<div key={s.value}>
								<FormControlLabel
									control={
										<Checkbox
											checked={isPeriodChecked(
												apiStatuses?.data?.find(
													(
														status: ReactSelectOption
													) =>
														status.label ===
														STATUS_STUDENT
												)?.label,
												s.label
											)}
											onChange={() =>
												onChange(
													handleSelectChange(
														apiStatuses?.data?.find(
															(
																status: ReactSelectOption
															) =>
																status.label ===
																STATUS_STUDENT
														),

														s
													)
												)
											}
											color="secondary"
										/>
									}
									label={s.label}
								/>
							</div>
						))}
						{checkIfOnceIsChecked(STATUS_STUDENT)}
					</div>
				)}
		</div>
	)
}

export default SearchDetails
