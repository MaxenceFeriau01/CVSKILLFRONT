import EventLocation from "../../../../../api/models/eventLocation"

export interface LocationFormModalProps {
	isOpen: boolean
	closeModal: () => any
	location?: EventLocation
}
