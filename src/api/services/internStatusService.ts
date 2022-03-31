/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import InternStatus from "../models/internStatus"
import GeneralService from "./generalService"

class InternStatusService extends GeneralService<InternStatus> {
	// Variables
}

const internStatusService = new InternStatusService("intern-status")

export default internStatusService
