import { useQuery, UseQueryResult } from "react-query"
import ReactSelectOption from "../api/models/reactSelectOption"
import activityService from "../api/services/activityService"

interface useActivitiesQueryType {
	activities: UseQueryResult<ReactSelectOption[]>
}

function useActivitiesQuery(): useActivitiesQueryType {
	const activities = useQuery<ReactSelectOption[]>("activities", () =>
		activityService
			.getAllWithFilters()
			.then(res => res.map(r => new ReactSelectOption(r.id, r.name)))
	)

	return { activities }
}

export default useActivitiesQuery
