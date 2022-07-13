import InternStatus from "./internStatus"

class InternType {
	id!: number

	periods!: string[]

	internStatus!: InternStatus

	constructor(periods: string[], internStatus: InternStatus) {
		this.periods = periods
		this.internStatus = internStatus
	}
}
export default InternType
