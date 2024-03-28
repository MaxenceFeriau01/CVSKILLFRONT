import EventLocation from "./eventLocation"
import ReactSelectOption from "./reactSelectOption"

class Event {
	id?: number

	name!: string

	active: boolean = true

	type!: string

	image!: string

	description?: string

	startedAt!: string

	endedAt!: string

	eventLocation!: EventLocation

	file?: any

	location?: ReactSelectOption

	selectedType?: string | any
}

export default Event
