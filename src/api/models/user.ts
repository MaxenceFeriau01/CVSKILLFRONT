import InternStatus from "./internStatus"
import Job from "./job"
import Company from "./company"

class User {
	email!: string

	password!: string

	roles!: Array<string>

	firstName!: string

	id?: string

	name!: string

	phone!: String

	postalCode!: number | null

	dateOfBirth!: Date

	internStatus!: InternStatus

	internshipPeriod!: String | null

	internshipStartDate!: Date

	internshipEndDate!: Date

	searchSubject!: String

	civility!: String

	diploma!: String | null

	jobs!: Array<Job> | null

	token!: string

	cv!: File | null

	coverLetter!: File | null

	activated!: boolean

	createdDate!: Date

	lastModifiedDate!: Date

	profileUpdateCount!: number

	appliedCompanies?: Company[]
}

export default User
