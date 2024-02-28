import Activity from "./activity"
import City from "./city"
import InternType from "./internType"
import Job from "./job"

class Company {
	id: number

	name: string

	contactFirstName?: string

	contactLastName?: string

	contactMail?: string

	contactNum?: string

	fixContactNum?: string

	siret?: string

	description: string

	searchedJobs: Job[]

	activities: Activity[]

	searchedActivities: Activity[]

	searchedInternsType!: InternType[]

	desiredInternsNumber!: string

	isPaidAndLongTermInternship!: boolean

	minorAccepted!: boolean

	logo!: any

	address!: string

	type!: string

	activated!: boolean

	epci?: string

	region?: string

	department?: string

	websiteUrl?: string

	city?: City

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
		searchedJobs: Job[],
		searchedActivities: Activity[],
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
		this.searchedJobs = searchedJobs
		this.searchedActivities = searchedActivities
	}
}
export default Company
