import EventLocation from "../models/eventLocation"
import Page from "../models/utils/Page"
import GeneralService from "./generalService"

class EventLocationService extends GeneralService<EventLocation | any> {
	getAllPaginatedLocations(filters?: Object): Promise<Page<EventLocation>> {
		return this.http
			.get(this.url, { params: filters })
			.then(this.handleResponse)
			.catch(this.handleError)
	}
}

const eventLocationService = new EventLocationService("event-locations")

export default eventLocationService
