import { Button, InputAdornment, TextField } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import SearchIcon from "@mui/icons-material/Search"
import { ROWS_OPTIONS } from "./Constants"
import useJobAdminPage from "./useJobAdminPage"

function JobAdminPage() {
	const {
		locale,
		search,
		onChange,
		jobs,
		addJob,
		onPageChange,
		setPageSize,
		sortModel,
		setSortModel,
		columns,
		handleCellEditCommit,
	} = useJobAdminPage()

	return (
		<section className="page">
			<div className="content job-content">
				<header className="job-page-header">
					<TextField
						id="searchJobName"
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
					<Button type="button" onClick={addJob}>
						Ajouter un métier
					</Button>
				</header>

				<DataGrid
					columns={columns}
					rows={jobs?.data?.content || []}
					pageSize={jobs?.data?.size}
					loading={jobs?.isLoading}
					rowCount={jobs?.data?.totalElements || 0}
					pagination
					paginationMode="server"
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					rowsPerPageOptions={ROWS_OPTIONS}
					localeText={locale}
					onPageChange={onPageChange}
					onCellEditCommit={handleCellEditCommit}
					sortingMode="server"
					sortModel={sortModel}
					onSortModelChange={model => setSortModel(model)}
				/>
				<i>* Double-clic sur le nom d'un métier pour le modifier</i>
			</div>
		</section>
	)
}

export default JobAdminPage
