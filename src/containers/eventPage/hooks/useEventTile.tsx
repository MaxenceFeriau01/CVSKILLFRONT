import { useState } from "react"
import { useMutation } from "react-query"
import eventService from "../../../api/services/eventService"
import { showConfirm } from "../../../utils/popupUtil"
import Event from "../../../api/models/event"

function useEventTile() {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const applyEvent = useMutation(
		(eventId: number) => eventService.apply(eventId),
		{
			onSuccess: () => {
				showConfirm(
					"Ton intérêt par l'événement est pris en compte.",
					"success",
					1500
				)
				handleClose()
			},
			onError: () => {
				showConfirm(
					"Tu as déjà manifesté ton intérêt pour cet événement.",
					"error",
					1500
				)
				handleClose()
			},
		}
	)

	const handleInterested = (event: Event) => {
		applyEvent.mutate(event.id || 0)
		if (event.website) {
			window.open(event.website, "_blank")
		}
	}

	const handleClick = () => {
		setIsOpen(true)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	return {
		isOpen,
		handleClick,
		handleClose,
		handleInterested,
	}
}

export default useEventTile
