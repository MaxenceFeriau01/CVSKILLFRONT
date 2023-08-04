import { useQuery } from "react-query"
import userService from "../../../api/services/userService"

function useStatisticsIndividualPage() {
	const individualStatsQuery = useQuery(["user-stats"], () =>
		userService.getUserStats()
	)

	return {
		individualStatsQuery,
	}
}

export default useStatisticsIndividualPage
