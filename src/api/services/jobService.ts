/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Job from "../models/job"
import GeneralService from "./generalService"

class JobService extends GeneralService<Job | any> {
	// Variables
}

const jobService = new JobService("jobs")

export default jobService
