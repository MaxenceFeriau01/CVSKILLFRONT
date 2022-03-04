import { Alert, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"
import { Controller } from "react-hook-form"
import ReactSelectOption from "../../api/models/reactSelectOption"
import CustomSelect from "../../components/inputs/customSelect"
import search from "../../resources/images/search.svg"
import { PERIOD_OPTIONS, STATUS_OPTIONS } from "../../utils/constants"

function CompanySearchDetails({ form }: any) {
	const {
		control,
		watch,
		formState: { errors },
	} = form
	const [checkedValues, setCheckedValues] = useState<ReactSelectOption[]>([])

	function handleCheck(value: ReactSelectOption) {
		const newValues =
			checkedValues.filter(e => e.value === value.value).length > 0
				? checkedValues?.filter(v => v.value !== value.value)
				: [...(checkedValues ?? []), value]
		setCheckedValues(newValues)

		return newValues
	}

	return (
		<>
			<img
				className="company-details-form__img"
				src={search}
				alt="Search"
			/>
			<div className="select">
				<h4>Quel type de stagiaires acceptez-vous d’accueillir ?</h4>
				<Controller
					name="searchInternStatus"
					control={control}
					defaultValue=""
					rules={{
						required: "Le type de stagiaires est requis",
					}}
					render={({ field: { onChange } }) => (
						<div className="company-details-form__checkbox__group ">
							{STATUS_OPTIONS?.map((s: ReactSelectOption) => (
								<>
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
										key={s.value}
									/>
									{watch}
								</>
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
		</>
	)
}

export default CompanySearchDetails
