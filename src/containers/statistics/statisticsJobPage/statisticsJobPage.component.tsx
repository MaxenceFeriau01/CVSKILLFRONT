import { DataGrid } from "@mui/x-data-grid"
import {
	LOCALE_LANG,
	PAGE_SIZE_OPTIONS,
	TABLE_COLUMNS,
} from "./statisticsJobPage.constant"
import useStatisticsJobPage from "./statisticsJobPage.hook"

function StatisticsJobPage() {
	const { jobsStatsQuery, pageSize, onChangePageSize } =
		useStatisticsJobPage()

	return (
		<section className="page">
			<div className="content h-full p-3">
				<DataGrid
					columns={TABLE_COLUMNS}
					rows={jobsStatsQuery?.data || []}
					pageSize={pageSize}
					onPageSizeChange={onChangePageSize}
					loading={jobsStatsQuery?.isLoading}
					pagination
					localeText={LOCALE_LANG}
					rowsPerPageOptions={PAGE_SIZE_OPTIONS}
				/>
			</div>
		</section>
	)
}

export default StatisticsJobPage
