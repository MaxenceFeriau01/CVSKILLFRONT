import { Button, InputAdornment, TextField } from "@mui/material"
import { DataGrid, frFR } from "@mui/x-data-grid"
import SearchIcon from "@mui/icons-material/Search"
import { ROWS_OPTIONS } from "./constant"
import useActivityAdminPage from "./useActivityAdminPage"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function ActivityAdminPage() {
	const {
		search,
		onChange,
		addActivity,
		columns,
		activities,
		onPageChange,
		onPageSizeChange,
		handleCellEditCommit,
		sortModel,
		setSortModel,
	} = useActivityAdminPage()

	return (
		<section className="page">
			<div className="content activity-content">
				<header className="activity-page-header">
					<TextField
						id="searchActivityName"
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
					<Button type="button" onClick={addActivity}>
						Ajouter un domaine d'activité
					</Button>
				</header>

				<DataGrid
					columns={columns}
					rows={activities?.data?.content || []}
					pageSize={activities?.data?.size}
					loading={activities?.isLoading}
					rowCount={activities?.data?.totalElements || 0}
					pagination
					paginationMode="server"
					onPageSizeChange={onPageSizeChange}
					rowsPerPageOptions={ROWS_OPTIONS}
					localeText={locale}
					onPageChange={onPageChange}
					onCellEditCommit={handleCellEditCommit}
					sortingMode="server"
					sortModel={sortModel}
					onSortModelChange={model => setSortModel(model)}
				/>
				<i>* Double-clic sur le nom d'une activité pour la modifier</i>
			</div>
		</section>
	)
}

export default ActivityAdminPage
