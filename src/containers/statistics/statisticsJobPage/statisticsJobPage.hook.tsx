import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { GridSortModel } from "@mui/x-data-grid"
import jobService from "../../../api/services/jobService"
import { PAGE, SIZE } from "../../admin/jobAdminPage/Constants"
import Page from "../../../api/models/utils/Page"
import { JobStat } from "../../../api/models/job.type"

function useStatisticsJobPage() {
	const [search, setSearch] = useState<string>("")
	const [pageSize, setPageSize] = useState<number>(SIZE)
	const [pageNumber, setPageNumber] = useState<number>(PAGE)
	const [sortModel, setSortModel] = useState<GridSortModel>([
		{ field: "userCount", sort: "desc" },
	])
	const [orderName, setOrderName] = useState<string>("")
	const [orderUserCount, setOrderUserCount] = useState<string>("desc")

	const jobsStatsQuery = useQuery<Page<JobStat>>(
		["job-stats", search, pageSize, pageNumber, orderName, orderUserCount],
		() =>
			jobService.getJobStat({
				page: pageNumber,
				size: pageSize,
				query: search !== "" ? search : null,
				orderName,
				orderUserCount,
			}),
		{
			retry: false,
			keepPreviousData: false,
		}
	)

	const onChange = (evt: any) => {
		evt.preventDefault()
		setSearch(evt.target.value)
	}

	const onPageChange = (page: number) => {
		if (page > pageNumber) {
			if (!jobsStatsQuery.isPreviousData) {
				setPageNumber(old => old + 1)
			}
		} else if (page < pageNumber) {
			setPageNumber(old => Math.max(old - 1, 0))
		}
	}

	useEffect(() => {
		// eslint-disable-next-line no-restricted-syntax
		for (const model of sortModel) {
			// eslint-disable-next-line default-case
			switch (model.field) {
				case "name":
					setOrderName(model.sort ?? "asc")
					break
				case "userCount":
					setOrderUserCount(model.sort ?? "desc")
					break
			}
		}
	}, [sortModel])

	return {
		search,
		onChange,
		pageSize,
		setPageSize,
		pageNumber,
		onPageChange,
		sortModel,
		setSortModel,
		jobsStatsQuery,
	}
}

export default useStatisticsJobPage
