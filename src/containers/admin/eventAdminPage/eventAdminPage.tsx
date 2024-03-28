import { Button, InputAdornment, TextField } from "@mui/material"
import { DataGrid, frFR } from "@mui/x-data-grid"
import SearchIcon from "@mui/icons-material/Search"
import useEventAdminPage from "./useEventAdminPage"
import { ROWS_OPTIONS } from "./constant"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function EventAdminPage() {
	const {
		columns,
		events,
		onChange,
		onPageChange,
		onPageSizeChange,
		page,
		query,
		size,
		navigate,
		sortModel,
		setSortModel,
	} = useEventAdminPage()

	return (
		<section className="page">
			<div className="content event-content">
				<header className="event-page-header">
					<TextField
						id="searchEventByQuery"
						label="Recherche par mot-clé"
						onChange={onChange}
						value={query}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<Button
						type="button"
						onClick={() => navigate("/admin/new-event")}
					>
						Ajouter un événement
					</Button>
				</header>
				{events.data && events.data?.content?.length > 0 && (
					<DataGrid
						columns={columns}
						rows={events.data?.content}
						page={page}
						pageSize={size}
						loading={events?.isLoading}
						rowCount={events?.data?.totalElements || 0}
						onPageSizeChange={onPageSizeChange}
						onPageChange={onPageChange}
						rowsPerPageOptions={ROWS_OPTIONS}
						pagination
						sortingMode="server"
						paginationMode="server"
						sortModel={sortModel}
						onSortModelChange={model => setSortModel(model)}
						localeText={locale}
						getRowClassName={params =>
							params.row.active ? "" : "bg-warning text-white"
						}
					/>
				)}
			</div>
		</section>
	)
}

export default EventAdminPage
