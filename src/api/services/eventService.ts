import Event from "../models/event"
import Page from "../models/utils/Page"
import GeneralService from "./generalService"

class EventService extends GeneralService<Event | any> {
	getAllPaginatedEvents(filters?: Object): Promise<Page<Event>> {
		return this.http
			.get(this.url, { params: filters })
			.then(this.handleResponse)
			.catch(this.handleError)
	}

	apply(id: number): Promise<Event | any> {
		return this.http
			.patch(`${this.url}/${id}/apply`)
			.then(this.handleResponse)
			.catch(this.handleError)
	}
}

const eventService = new EventService("events")

export default eventService
