import { DataGrid } from "@mui/x-data-grid"
import {
	LOCALE_LANG,
	PAGE_SIZE_OPTIONS,
	TABLE_COLUMNS,
} from "./statisticsIndividualPage.constant"
import useStatisticsIndividualPage from "./statisticsIndividualPage.hook"

function StatisticsIndividualPage() {
	const { individualStatsQuery } = useStatisticsIndividualPage()

	return (
		<section className="page">
			<div className="content h-full p-3">
				<DataGrid
					columns={TABLE_COLUMNS}
					rows={individualStatsQuery?.data || []}
					loading={individualStatsQuery?.isLoading}
					pagination
					localeText={LOCALE_LANG}
					rowsPerPageOptions={PAGE_SIZE_OPTIONS}
				/>
			</div>
		</section>
	)
}

export default StatisticsIndividualPage
