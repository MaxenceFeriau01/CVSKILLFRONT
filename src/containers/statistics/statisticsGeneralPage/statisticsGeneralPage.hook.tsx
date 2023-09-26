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

	const setStartDate = (startDate: any) => {
		if (!startDate) {
			setStartedAt(dayjs().startOf("year").format("YYYY-MM-DD"))
		} else if (dayjs(startDate).isAfter(dayjs(endedAt))) {
			setStartedAt(dayjs().startOf("year").format("YYYY-MM-DD"))
		} else {
			setStartedAt(dayjs(startDate).format("YYYY-MM-DD"))
		}
	}

	const setEndDate = (endDate: any) => {
		if (!endDate) {
			setEndedAt(dayjs().format("YYYY-MM-DD"))
		} else if (dayjs(endDate).isBefore(dayjs(startedAt))) {
			setEndedAt(dayjs().format("YYYY-MM-DD"))
		} else {
			setEndedAt(dayjs(endDate).format("YYYY-MM-DD"))
		}
	}

	return {
		startedAt,
		setStartDate,
		endedAt,
		setEndDate,
		generalStats,
	}
}

export default useStatisticsGeneralPage
