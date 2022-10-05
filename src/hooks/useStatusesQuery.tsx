import { useQuery, UseQueryResult } from "react-query"
import ReactSelectOption from "../api/models/reactSelectOption"
import internStatusService from "../api/services/internStatusService"

interface useStatusesQueryType {
	statuses: UseQueryResult<ReactSelectOption[]>
}

function useStatusesQuery(): useStatusesQueryType {
	const statuses = useQuery<ReactSelectOption[]>("statuses", () =>
		internStatusService
			.getAllWithFilters()
			.then(res => res.map(r => new ReactSelectOption(r.id, r.name)))
	)

	return { statuses }
}

export default useStatusesQuery
