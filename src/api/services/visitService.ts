import GeneralService from "./generalService"

class VisitService extends GeneralService<any> {
	incrementVisitCounter() {
		return this.post(null, "")
	}
}

const visitService = new VisitService("visits")

export default visitService
