import dayjs from "dayjs"
import { useState } from "react"
import { useQuery } from "react-query"
import statisticService from "../../../api/services/statisticService"
import GeneralStatistics from "./statisticsGeneral.type"

function useStatisticsGeneralPage() {
	const [endedAt, setEndedAt] = useState<string>(dayjs().format("YYYY-MM-DD"))
	const [startedAt, setStartedAt] = useState<string>(
		dayjs().startOf("year").format("YYYY-MM-DD")
	)

	const generalStats = useQuery<GeneralStatistics>(
		["general-stats", startedAt, endedAt],
		() =>
			statisticService.getStatistics({
				startedAt: `${startedAt}T00:00:00`,
				endedAt: `${endedAt}T23:59:59`,
			}),
		{
			keepPreviousData: false,
		}
	)

	return {
		startedAt,
		setStartedAt,
		endedAt,
		setEndedAt,
		generalStats,
	}
}

export default useStatisticsGeneralPage
