import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { useMutation } from "react-query"
import contactService from "../../api/services/contactService"
import { ContactEmail } from "./contactDialog.type"

export default function useContactDialog(closeModal: any) {
	const { handleSubmit, control, reset } = useForm()
	const postSendEmail = useMutation(
		(contact: ContactEmail) => contactService.sendContactEmail(contact),
		{
			onSuccess: () => {
				closeDialog()
				Swal.fire({
					title: "Succès",
					text: "La demande de contact a bien été envoyé.",
					icon: "success",
					timer: 1500,
				})
			},
		}
	)

	const onSubmit = (data: any) => {
		postSendEmail.mutate(data)
	}

	const closeDialog = () => {
		reset()
		closeModal()
	}

	return {
		handleSubmit,
		onSubmit,
		control,
		closeDialog,
	}
}
