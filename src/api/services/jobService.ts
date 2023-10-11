/**
 * Used to extend all other services.
 * It supplies basic functions of CRUD
 */

import Job from "../models/job"
import GeneralService from "./generalService"
import Page from "../models/utils/Page"
import { JobRequestStat, JobStat } from "../models/job.type"

class JobService extends GeneralService<Job | Page<JobStat> | any> {
	getJobStat(filters: JobRequestStat): Promise<Page<JobStat>> {
		return this.http
			.get(`${this.url}/stats`, { params: filters })
			.then(this.handleResponse)
			.catch(this.handleError)
	}
}

const jobService = new JobService("jobs")

export default jobService
