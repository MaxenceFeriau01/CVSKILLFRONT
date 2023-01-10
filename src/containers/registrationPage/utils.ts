import InternStatus from "../../api/models/internStatus"
import Job from "../../api/models/job"
import User from "../../api/models/user"
import { STATUS_COLLEGE_STUDENT } from "../../utils/constants"

export default function convertFormToApiData(data: any): FormData {
	const formData = new FormData()

	const toCreate: User = { ...data }

	if (data.internStatus.label === STATUS_COLLEGE_STUDENT) {
		toCreate.jobs = null
		toCreate.diploma = null
		toCreate.internshipPeriod = null
	} else {
		toCreate.jobs = data.jobs?.map((j: Job) => ({ id: j }))
	}

	toCreate.jobs = data.jobs?.map((j: Job) => ({ id: j }))
	toCreate.internStatus = new InternStatus(
		data.internStatus?.value,
		data.internStatus?.label
	)

	toCreate.cv = null
	toCreate.coverLetter = null

	formData.append("user", JSON.stringify(toCreate))
	formData.append("cv", data.cv?.length > 0 ? data.cv[0] : null)
	formData.append(
		"coverLetter",
		data.coverLetter?.length > 0 ? data.coverLetter[0] : null
	)

	return formData
}
