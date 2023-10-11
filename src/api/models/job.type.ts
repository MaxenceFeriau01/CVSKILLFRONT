export type JobStat = {
	name: string
	userCount: number
}

export type JobRequestStat = {
	size: number
	query: string | null
	page: number
	orderName?: string
	orderUserCount?: string
}
