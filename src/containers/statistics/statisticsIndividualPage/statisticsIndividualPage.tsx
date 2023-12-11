import { DataGrid } from "@mui/x-data-grid"
import { Button, InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {
	PAGE_SIZE_OPTIONS,
	LOCALE_LANG,
} from "./statisticsIndividualPage.constant"
import useStatisticsIndividuelPage from "./statisticsIndividualPage.hook"

function StatisticsIndividualPage() {
	const {
		users,
		columns,
		formattedUsers,
		onPageSizeChange,
		sortModel,
		setSortModel,
		onPageChange,
		search,
		onChange,
		setExcel,
	} = useStatisticsIndividuelPage()

	return (
		<section className="page">
			<div className="content user-content">
				<header className="user-page-header">
					<TextField
						id="query"
						label="Rechercher par mot-clé"
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
					<Button type="button" onClick={() => setExcel(true)}>
						Exporter
					</Button>
				</header>
				<DataGrid
					columns={columns}
					rows={formattedUsers || []}
					pageSize={users?.data?.size}
					loading={users?.isLoading}
					rowCount={users?.data?.totalElements || 0}
					onPageSizeChange={onPageSizeChange}
					rowsPerPageOptions={PAGE_SIZE_OPTIONS}
					pagination
					paginationMode="server"
					sortingMode="server"
					sortModel={sortModel}
					onSortModelChange={model => setSortModel(model)}
					localeText={LOCALE_LANG}
					onPageChange={onPageChange}
					getRowClassName={params =>
						`${params.row.activated ? "" : "bg-warning text-white"}`
					}
				/>
			</div>
		</section>
	)
}
export default StatisticsIndividualPage
