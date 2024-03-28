/* eslint-disable import/prefer-default-export */
import Swal from "sweetalert2"

export function showConfirm(
	text = "Opération réussie.",
	icon: any = "success",
	timer = 2000
): void {
	let title = ""
	switch (icon) {
		case "success":
			title = "Succès"
			break
		case "warning":
			title = "Avertissement"
			break
		case "error":
			title = "Erreur"
			break
		default:
			title = "Information"
			break
	}
	Swal.fire({
		title,
		text,
		icon,
		position: "center",
		showConfirmButton: false,
		showCloseButton: true,
		timerProgressBar: true,
		timer,
	})
}

export function showConfirmAction(
	functionToExecute: any,
	text = "Vous ne pourrez pas revenir en arrière !",
	confirmButtonText = "Oui, supprimer !",
	cancelButtonText = "Annuler"
) {
	Swal.fire({
		title: "Êtes-vous sûr ?",
		text,
		icon: "warning",
		showCancelButton: true,
		confirmButtonText,
		cancelButtonText,
	}).then(result => {
		if (result.isConfirmed) {
			functionToExecute()
		}
	})
}

export function showThreeButtonActions(
	onFirstAction: any,
	onSecondAction: any,
	text = "Vous ne pourrez pas revenir en arrière !",
	confirmButtonText = "Sauvegarder",
	denyButtonText = "Ne pas sauvegarder"
) {
	Swal.fire({
		title: "Êtes-vous sûr ?",
		text,
		icon: "warning",
		showDenyButton: true,
		confirmButtonText,
		denyButtonText,
	}).then(result => {
		if (result.isConfirmed) {
			onFirstAction()
		} else if (result.isDenied) {
			onSecondAction()
		}
	})
}
