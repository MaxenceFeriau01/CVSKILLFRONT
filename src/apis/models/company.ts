import Activity from "./activity"

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

	logo: string

	constructor(
		id: number,
		name: string,
		contactFirstName: string,
		contactNum: string,
		contactLastName: string,
		contactMail: string,
		siret: string,
		description: string,
		activities: Activity[],
		logo: string
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
	}
}
export default Company
