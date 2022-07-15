/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import InternStatus from "../models/internStatus"
import GeneralService from "./generalService"

class InternStatusService extends GeneralService<InternStatus> {
	getStatusesForApplicant(): Promise<InternStatus[]> {
		return this.getAllWithFilters(null, "/for-applicant")
	}
	// Variables
}

const internStatusService = new InternStatusService("intern-status")

export default internStatusService
