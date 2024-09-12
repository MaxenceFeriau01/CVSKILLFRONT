export default class UserCvSkillDto {
	id: number

	civility: string

	firstName: string

	name: string

	phone: string

	email: string

	dateOfBirth: Date

	diploma: string | null

	constructor(data: Partial<UserCvSkillDto>) {
		this.id = data.id ?? 0
		this.civility = data.civility ?? ""
		this.firstName = data.firstName ?? ""
		this.name = data.name ?? ""
		this.phone = data.phone ?? ""
		this.email = data.email ?? ""
		this.diploma = data.diploma ?? ""
		this.dateOfBirth = data.dateOfBirth
			? new Date(data.dateOfBirth)
			: new Date()
	}
}
