import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { DataGrid } from "@mui/x-data-grid"
import {
	LOCALE_LANG,
	onChange,
	PAGE_SIZE_OPTIONS,
	search,
	TABLE_COLUMNS,
} from "./statisticsIndividualPage.constant"
import useStatisticsIndividualPage from "./statisticsIndividualPage.hook"

function StatisticsIndividualPage() {
	const { individualStatsQuery } = useStatisticsIndividualPage()

	return (
		<section className="page">
			<div className="content h-full p-3">
				<TextField
					id="searchUserName"
					label="Rechercher par nom"
					value={search}
					onChange={onChange}
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
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
