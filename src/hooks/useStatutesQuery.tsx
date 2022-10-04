import { useQuery, UseQueryResult } from "react-query"
import ReactSelectOption from "../api/models/reactSelectOption"
import internStatusService from "../api/services/internStatusService"

interface useStatutesQueryType {
	statuses: UseQueryResult<ReactSelectOption[]>
}

function useStatutesQuery(): useStatutesQueryType {
	const statuses = useQuery<ReactSelectOption[]>("statuses", () =>
		internStatusService
			.getAllWithFilters()
			.then(res =>
				res
					.sort((a, b) => a.id - b.id)
					.map(r => new ReactSelectOption(r.id, r.name))
			)
	)

	return { statuses }
}

export default useStatutesQuery
