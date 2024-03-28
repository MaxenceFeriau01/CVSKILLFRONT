import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormGroup,
	TextField,
} from "@mui/material"
import { Controller } from "react-hook-form"
import { LocationFormModalProps } from "./constants"
import useLocationFormModal from "./useLocationFormModal"

function LocationFormModal({
	isOpen,
	closeModal,
	location,
}: LocationFormModalProps) {
	const { form, saveItem } = useLocationFormModal(location, closeModal)

	return (
		<Dialog open={isOpen} onClose={closeModal} maxWidth="lg">
			<DialogTitle>
				{location?.id
					? `Edition de ${location.name} (ID=${location.id})`
					: "Ajout d'un lieu"}
			</DialogTitle>
			<DialogContent className="location-form">
				<FormGroup row className="location-form-row">
					<Controller
						name="name"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								label="Intitulé"
								variant="outlined"
								className="w-full"
								value={value}
								onChange={onChange}
							/>
						)}
					/>
				</FormGroup>
				<FormGroup row className="location-form-row">
					<Controller
						name="address"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								multiline
								rows="3"
								label="Adresse postale"
								variant="outlined"
								className="w-full"
								value={value}
								onChange={onChange}
							/>
						)}
					/>
				</FormGroup>
				<FormGroup row className="location-form-row">
					<Controller
						name="postalCode"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								label="Code postal"
								variant="outlined"
								value={value}
								onChange={onChange}
							/>
						)}
					/>
					<Controller
						name="city"
						control={form.control}
						render={({ field: { onChange, value } }) => (
							<TextField
								required
								label="Ville"
								variant="outlined"
								className="ml-2"
								value={value}
								onChange={onChange}
							/>
						)}
					/>
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button type="button" onClick={saveItem}>
					Sauvegarder le lieu
				</Button>
				<Button type="button" onClick={closeModal}>
					Fermer
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default LocationFormModal
