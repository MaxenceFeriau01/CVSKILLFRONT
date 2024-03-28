import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import EventLocation from "../../../../../api/models/eventLocation"
import eventLocationService from "../../../../../api/services/eventLocationService"
import { showConfirm } from "../../../../../utils/popupUtil"

function useLocationFormModal(location?: EventLocation, closeModal?: any) {
	const form = useForm<EventLocation>({
		mode: "onChange",
		defaultValues: {
			id: location?.id || undefined,
			name: location?.name || "",
			address: location?.address || "",
			postalCode: location?.postalCode || "",
			city: location?.city || "",
		},
	})

	useEffect(() => {
		form.setValue("id", location?.id)
		form.setValue("name", location?.name || "")
		form.setValue("address", location?.address || "")
		form.setValue("postalCode", location?.postalCode || "")
		form.setValue("city", location?.city || "")
	}, [location])

	const saveLocation = useMutation(
		(item: EventLocation) => {
			if (item.id && item.id > 0) {
				return eventLocationService.put(item, item.id)
			}
			return eventLocationService.post(item)
		},
		{
			onSuccess: () => {
				closeModal()
				showConfirm(
					"Lieu enregistré en base de données",
					"success",
					1500
				)
			},
			onError: () => {
				showConfirm(
					"Une erreur est survenue durant l'enregistrement du lieu",
					"error",
					1500
				)
			},
		}
	)

	const saveItem = () => {
		if (
			form.getValues().name &&
			form.getValues().address &&
			form.getValues().postalCode &&
			form.getValues().city
		) {
			saveLocation.mutate({
				...form.getValues(),
			})
		} else {
			showConfirm(
				"Erreur lors de la sauvegarde : tous les champs doivent être renseignés.",
				"warning",
				1500
			)
		}
	}

	return {
		form,
		saveItem,
	}
}

export default useLocationFormModal
