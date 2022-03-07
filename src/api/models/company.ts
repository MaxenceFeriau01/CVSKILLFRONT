import Activity from "./activity"
import Job from "./job"

class Company {
	id: number

	name: string

	contactFirstName: string

	contactLastName: string

	contactMail: string

	contactNum: string

	siret: string

	description: string

	activities: Activity[]

	jobs: Job[]

	logo!: any

	town!: string

	address!: string

	postalCode!: string

	type!: string

	constructor(
		id: number,
		name: string,
		contactFirstName: string,
		contactNum: string,
		contactLastName: string,
		contactMail: string,
		siret: string,
		description: string,
		activities: Activity | any,
		jobs: Job[] | any,
		logo: any
	) {
		this.id = id
		this.name = name
		this.contactFirstName = contactFirstName
		this.contactMail = contactMail
		this.contactLastName = contactLastName
		this.contactNum = contactNum
		this.siret = siret
		this.description = description
		this.activities = activities
		this.logo = logo
		this.jobs = jobs
	}
}
export default Company
