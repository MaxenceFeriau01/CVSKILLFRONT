import { useQuery } from "react-query"
import userService from "../../../api/services/userService"

function useStatisticsIndividualPage(initialPage = 0, initialPageSize = 20) {
	const individualStatsQuery = useQuery(
		["user-stats", initialPage, initialPageSize],
		() =>
			userService.getAllPaginated({
				page: initialPage,
				size: initialPageSize,
			})
	)
	return {
		individualStatsQuery,
		fetchIndividualStats: (
			page: unknown | string,
			pageSize: unknown | string
		) => {
			individualStatsQuery.refetch({
				queryKey: ["user-stats", page, pageSize],
			})
		},
	}
}
export default useStatisticsIndividualPage
