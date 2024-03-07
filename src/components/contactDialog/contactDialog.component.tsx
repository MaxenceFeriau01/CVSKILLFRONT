import {
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	TextField,
} from "@mui/material"
import { Controller } from "react-hook-form"
import { ContactDialogProps } from "./contactDialog.type"
import useContactDialog from "./contactDialog.hook"

export default function ContactDialog({
	isOpen,
	closeModal,
}: ContactDialogProps) {
	const { handleSubmit, control, onSubmit, closeDialog } =
		useContactDialog(closeModal)

	return (
		<Dialog open={isOpen} onClose={closeDialog} maxWidth="lg">
			<DialogTitle>Contactez-nous</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ marginBottom: "25px" }}>
					Votre Entreprise est ouverte à l’accueil de stagiaires ?
					Vous recherchez des alternants ? Laissez-nous vos
					coordonnées mail et téléphonique, la Cellule stages va vous
					contacter rapidement.
				</DialogContentText>

				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Controller
								name="fullName"
								control={control}
								defaultValue=""
								render={({ field: { onChange, value } }) => (
									<TextField
										required
										value={value}
										onChange={onChange}
										name="fullName"
										label="Nom complet"
										variant="outlined"
										fullWidth
									/>
								)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Controller
								name="company"
								control={control}
								defaultValue=""
								render={({ field: { onChange, value } }) => (
									<TextField
										required
										value={value}
										onChange={onChange}
										name="company"
										label="Nom de l'entreprise"
										variant="outlined"
										fullWidth
									/>
								)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								render={({ field: { onChange, value } }) => (
									<TextField
										required
										value={value}
										onChange={onChange}
										name="email"
										type="email"
										label="Adresse e-mail"
										variant="outlined"
										fullWidth
									/>
								)}
							/>
						</Grid>
						<Grid item xs={6}>
							<Controller
								name="phone"
								control={control}
								defaultValue=""
								render={({ field: { onChange, value } }) => (
									<TextField
										required
										value={value}
										onChange={onChange}
										name="phone"
										type="phone"
										label="Numéro de téléphone"
										variant="outlined"
										fullWidth
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="content"
								control={control}
								defaultValue=""
								render={({ field: { onChange, value } }) => (
									<TextField
										required
										value={value}
										onChange={onChange}
										name="content"
										label="Contenu de la demande"
										multiline
										rows={5}
										fullWidth
									/>
								)}
							/>
						</Grid>
						<Grid item xs={3} />
						<Grid item xs={6}>
							<Button type="submit" fullWidth>
								Envoyer la demande
							</Button>
						</Grid>
					</Grid>
				</form>
			</DialogContent>
		</Dialog>
	)
}
