/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Job from "../models/job"
import { JobStat } from "../models/job.type"
import GeneralService from "./generalService"

class JobService extends GeneralService<Job | any> {
	getJobStats(): Promise<JobStat[]> {
		return this.get("/stats")
	}
}

const jobService = new JobService("jobs")

export default jobService
