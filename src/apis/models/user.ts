import Activity from "./activity"
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

	status!: String

	internshipPeriod!: String | null

	civility!: String

	diploma!: String | null

	activities!: Array<Activity> | null

	jobs!: Array<Job> | null
}

export default User
