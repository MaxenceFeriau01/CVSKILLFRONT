import { useQuery } from "react-query"
import jobService from "../../../api/services/jobService"
import { PAGE_SIZE_DEFAULT } from "./statisticsJobPage.constant"
import usePagination from "../../../hooks/usePagination.hook"

function useStatisticsJobPage() {
	const { pageSize, onChangePageSize } = usePagination(PAGE_SIZE_DEFAULT)
	const jobsStatsQuery = useQuery(["jobs-stats"], () =>
		jobService.getAllWithFilters()
	)

	return {
		pageSize,
		onChangePageSize,
		jobsStatsQuery,
	}
}

export default useStatisticsJobPage
