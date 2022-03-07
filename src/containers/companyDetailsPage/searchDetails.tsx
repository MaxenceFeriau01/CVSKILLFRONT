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
import { INTERN_NUMBER_OPTIONS } from "./constants"

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
					name="searchInternStatus"
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
											"searchInternStatus"
										)}
										internStatus={s.value}
										form={form}
									/>
								</div>
							))}
						</div>
					)}
				/>
				{errors?.searchInternStatus && (
					<Alert severity="error">
						{errors?.searchInternStatus?.message}
					</Alert>
				)}
			</div>
			<div className="select" style={{ zIndex: 3 }}>
				<h4>
					Sur quels domaines d’activités et quels métiers pouvez-vous
					accueillir des stagiaires ?
				</h4>
				<Controller
					name="searchActivities"
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
				{errors?.searchActivities && (
					<Alert severity="error">
						{errors?.searchActivities?.message}
					</Alert>
				)}
			</div>
			<div className="select" style={{ zIndex: 2 }}>
				<Controller
					name="searchJobs"
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
				{errors?.searchJobs && (
					<Alert severity="error">
						{errors?.searchJobs?.message}
					</Alert>
				)}
			</div>

			<div className="select">
				<h4>
					Acceptez-vous de prendre des stagiaires de longues durée,
					rémunérés ?
				</h4>
				<Controller
					name="paidIntern"
					rules={{
						required: "Ce champ est requis",
					}}
					control={control}
					render={({ field: { onChange, onBlur } }) => (
						<RadioGroup onChange={onChange} onBlur={onBlur}>
							<FormControlLabel
								value="true"
								control={<Radio />}
								label="Oui"
							/>
							<FormControlLabel
								value="false"
								control={<Radio />}
								label="Non"
							/>
						</RadioGroup>
					)}
				/>
				{errors?.paidIntern && (
					<Alert severity="error">
						{errors?.paidIntern?.message}
					</Alert>
				)}
			</div>
			<div className="select">
				<h4>Combien de stagiaires pouvez-vous accueillir par an ?</h4>
				<Controller
					name="internNumber"
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
						{errors?.internNumber?.message}
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
							name="studentInternshipPeriod"
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
						{errors?.studentInternshipPeriod && (
							<Alert severity="error">
								{errors.studentInternshipPeriod.message}
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
							name="jobSeekerInternshipPeriod"
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
						{errors?.jobSeekerInternshipPeriod && (
							<Alert severity="error">
								{errors.jobSeekerInternshipPeriod.message}
							</Alert>
						)}
					</div>
				)}
		</div>
	)
}

export default SearchDetails
