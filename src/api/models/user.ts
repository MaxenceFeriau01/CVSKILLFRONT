import Activity from "./activity"
import InternStatus from "./internStatus"
import Job from "./job"

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

	civility!: String

	diploma!: String | null

	activities!: Array<Activity> | null

	jobs!: Array<Job> | null

	token!: string

	cv!: File | null

	coverLetter!: File | null

	activated!: boolean
}

export default User
