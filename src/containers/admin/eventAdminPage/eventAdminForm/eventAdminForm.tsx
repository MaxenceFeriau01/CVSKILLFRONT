import { useParams } from "react-router-dom"
import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	FormLabel,
	InputLabel,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material"
import { Controller } from "react-hook-form"
import { CloudUpload, Place } from "@mui/icons-material"
import useEventAdminForm from "./useEventAdminForm"
import { VisuallyHiddenInput } from "../../../../utils/constants"
import CustomSelect from "../../../../components/inputs/customSelect"
import ReactSelectOption from "../../../../api/models/reactSelectOption"
import EventLocationModal from "../eventLocationModal/eventLocationModal"
import { TYPE_OPTIONS } from "../constant"

function EventAdminForm() {
	const { id } = useParams()
	const {
		event,
		form,
		setQuery,
		handleSave,
		onUploadImage,
		onChangeLocation,
		onSelectType,
		options,
		otherField,
		placeModal,
		openPlaceModal,
		closePlaceModal,
	} = useEventAdminForm({ id })

	return (
		<section className="page event-details-page">
			<h1 className="text-center mt-4">
				{id !== undefined
					? `Edition de l'événement : ${event.data?.name} (ID=${event.data?.id})`
					: "Création d'un événement"}
			</h1>
			<form
				onSubmit={form.handleSubmit(handleSave)}
				className="content event-details-form"
			>
				<FormGroup row>
					<Controller
						name="name"
						control={form.control}
						defaultValue=""
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								label="Intitulé"
								variant="outlined"
								value={value}
								onChange={onChange}
							/>
						)}
					/>
					<Controller
						name="selectedType"
						control={form.control}
						defaultValue=""
						render={({ field: { value, onChange, onBlur } }) => (
							<div className="w-1/2">
								<FormLabel>Type *</FormLabel>
								<CustomSelect
									isSearchable
									options={TYPE_OPTIONS}
									placeholder="Choisissez..."
									onBlur={onBlur}
									value={TYPE_OPTIONS.find(
										(c: ReactSelectOption) =>
											c.value === value
									)}
									onChange={(val: ReactSelectOption) => {
										onChange(val)
										onSelectType(val.value)
									}}
								/>
							</div>
						)}
					/>
				</FormGroup>

				{otherField && (
					<Controller
						name="type"
						control={form.control}
						defaultValue=""
						render={({ field: { value, onChange } }) => (
							<TextField
								required
								label="Autre type"
								variant="outlined"
								className="w-full"
								value={value}
								onChange={onChange}
							/>
						)}
					/>
				)}

				<FormGroup row>
					<Controller
						name="startedAt"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<TextField
								label="Début de l'événement"
								type="datetime-local"
								inputProps={{
									pattern:
										"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}",
								}}
								onChange={onChange}
								value={value}
								required
							/>
						)}
					/>
					<Controller
						name="endedAt"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<TextField
								label="Fin de l'événement"
								type="datetime-local"
								inputProps={{
									pattern:
										"[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}",
								}}
								onChange={onChange}
								value={value}
								required
							/>
						)}
					/>
				</FormGroup>

				<FormGroup row>
					<Controller
						name="active"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<>
								<FormLabel>Etat *</FormLabel>
								<RadioGroup
									value={value}
									onChange={onChange}
									style={{ flexDirection: "row" }}
								>
									<FormControlLabel
										value={false}
										control={<Radio />}
										label="Non publié"
									/>
									<FormControlLabel
										value
										control={<Radio />}
										label="Publié"
									/>
								</RadioGroup>
							</>
						)}
					/>
					<Controller
						name="file"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<Button
								component="label"
								variant="contained"
								startIcon={<CloudUpload />}
							>
								Télécharger une image *
								<VisuallyHiddenInput
									type="file"
									value={value}
									onChange={(evt: any) => {
										onChange()
										onUploadImage(evt)
									}}
								/>
								{form.getValues().image && (
									<img
										src={form.getValues().image}
										alt={form.getValues().name}
										width="32"
										className="ml-2"
									/>
								)}
							</Button>
						)}
					/>
				</FormGroup>

				<FormGroup row>
					<Controller
						name="location"
						control={form.control}
						render={({ field: { value, onChange, onBlur } }) => (
							<>
								<InputLabel>Lieu *</InputLabel>
								<div className="inline-flex space-between w-full mt-4">
									<div className="w-5/6">
										<CustomSelect
											required
											isSearchable
											options={options}
											placeholder="Choisissez..."
											className="w-full"
											onInputChange={(
												inputChange: string
											) => {
												setQuery(inputChange)
											}}
											onBlur={onBlur}
											value={options?.find(
												(c: ReactSelectOption) =>
													c.value === value?.value
											)}
											onChange={(
												val: ReactSelectOption
											) => {
												onChange(val)
												onChangeLocation(val)
											}}
										/>
									</div>
									<Button
										type="button"
										className="w-1/6 ml-2"
										onClick={openPlaceModal}
									>
										<Place /> Gérer les lieux
									</Button>
								</div>
							</>
						)}
					/>
				</FormGroup>

				<FormGroup row>
					<Controller
						name="description"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								multiline
								rows="5"
								label="Description"
								variant="outlined"
								className="form-control-full"
								value={value}
								onChange={onChange}
							/>
						)}
					/>
				</FormGroup>

				<EventLocationModal
					isOpen={placeModal}
					closeModal={closePlaceModal}
				/>

				<div className="event-details-form-actions">
					<Box sx={{ flex: "1 1 auto" }} />
					<Button type="submit" className="mr-1 tablet:mr-0">
						{id !== undefined
							? "Mettre à jour"
							: "Créer un événement"}
					</Button>
				</div>
			</form>
		</section>
	)
}

export default EventAdminForm
