import { useQuery } from "react-query"
import userService from "../../../api/services/userService"

function useStatisticsIndividualPage(initialPage = 1, initialPageSize = 10) {
	const individualStatsQuery = useQuery(
		["user-stats", initialPage, initialPageSize],
		() => {
			console.log(
				"Fetching data with page:",
				initialPage,
				"and pageSize:",
				initialPageSize
			)
			return userService.getAllPaginated({
				page: initialPage,
				size: initialPageSize,
			})
		}
	)

	// Log the query status and data when they change
	console.log("Query status:", individualStatsQuery.status)
	console.log("Query data:", individualStatsQuery.data)

	return {
		individualStatsQuery,
		fetchIndividualStats: (
			page: unknown | string,
			pageSize: unknown | string
		) => {
			console.log(
				"Fetching data with page:",
				page,
				"and pageSize:",
				pageSize
			)
			individualStatsQuery.refetch({
				queryKey: ["user-stats", page, pageSize],
			})
		},
	}
}
export default useStatisticsIndividualPage
