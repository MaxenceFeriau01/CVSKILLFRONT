import InternStatus from "./internStatus"

class InternType {
	id!: number

	period!: string

	internStatus!: InternStatus

	constructor(period: string, internStatus: InternStatus) {
		this.period = period
		this.internStatus = internStatus
	}
}
export default InternType
