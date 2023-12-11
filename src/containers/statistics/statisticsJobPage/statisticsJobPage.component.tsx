import { DataGrid } from "@mui/x-data-grid"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {
	LOCALE_LANG,
	PAGE_SIZE_OPTIONS,
	TABLE_COLUMNS,
} from "./statisticsJobPage.constant"
import useStatisticsJobPage from "./statisticsJobPage.hook"

function StatisticsJobPage() {
	const {
		jobsStatsQuery,
		pageSize,
		onPageSizeChange,
		onPageChange,
		pageNumber,
		search,
		onChange,
		sortModel,
		setSortModel,
	} = useStatisticsJobPage()

	return (
		<section className="page">
			<div className="content h-full p-3">
				<header className="w-full mx-1 my-2">
					<TextField
						id="query"
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
				</header>
				<DataGrid
					getRowId={row => row.name}
					columns={TABLE_COLUMNS}
					rows={jobsStatsQuery?.data?.content ?? []}
					pageSize={pageSize}
					onPageSizeChange={onPageSizeChange}
					page={pageNumber}
					onPageChange={onPageChange}
					loading={jobsStatsQuery?.isLoading}
					rowCount={jobsStatsQuery?.data?.totalElements ?? 0}
					pagination
					paginationMode="server"
					localeText={LOCALE_LANG}
					rowsPerPageOptions={PAGE_SIZE_OPTIONS}
					sortingMode="server"
					sortModel={sortModel}
					onSortModelChange={model => setSortModel(model)}
				/>
			</div>
		</section>
	)
}

export default StatisticsJobPage
