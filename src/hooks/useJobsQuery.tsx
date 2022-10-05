import { useQuery, UseQueryResult } from "react-query"
import ReactSelectOption from "../api/models/reactSelectOption"
import jobService from "../api/services/jobService"

interface useJobsQueryType {
	jobs: UseQueryResult<ReactSelectOption[]>
}

function useJobsQuery(): useJobsQueryType {
	const jobs = useQuery<ReactSelectOption[]>("jobs", () =>
		jobService
			.getAllWithFilters()
			.then(res => res.map(r => new ReactSelectOption(r.id, r.name)))
	)

	return { jobs }
}

export default useJobsQuery
