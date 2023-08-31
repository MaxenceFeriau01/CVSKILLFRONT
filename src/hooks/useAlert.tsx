import Swal, { SweetAlertIcon } from "sweetalert2"

const useAlert = () => {
	const alertInfo = (text = "Opération réussie.", timer = 2000) => {
		showAlert("Information", text, "info", timer)
	}

	const alertSuccess = (text = "Opération réussie.", timer = 2000) => {
		showAlert("Succès", text, "success", timer)
	}

	const alertError = (text = "Opération ratée.", timer = 2000) => {
		showAlert("Erreur", text, "error", timer)
	}

	const alertWarning = (text = "Attention", timer = 2000) => {
		showAlert("Avertissement", text, "warning", timer)
	}

	const promptConfirm = (
		functionToExecute: any,
		text = "Vous ne pourrez pas revenir en arrière !",
		confirmButtonText = "Oui, supprimer !",
		cancelButtonText = "Annuler"
	) => {
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

	const showAlert = (
		title: string,
		text: string,
		icon: SweetAlertIcon,
		timer: number
	) => {
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

	return {
		alertSuccess,
		alertWarning,
		alertError,
		alertInfo,
		promptConfirm,
	}
}

export default useAlert
