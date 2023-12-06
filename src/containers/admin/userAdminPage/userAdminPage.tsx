import { InputAdornment, TextField } from "@mui/material"
import { DataGrid, frFR } from "@mui/x-data-grid"
import SearchIcon from "@mui/icons-material/Search"
import { ROWS_OPTIONS } from "./constant"
import useUserAdminPage from "./useUserAdminPage"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function UserAdminPage() {
	const {
		search,
		onChange,
		users,
		onPageChange,
		formattedUsers,
		setPageSize,
		sortModel,
		setSortModel,
		columns,
	} = useUserAdminPage()

	return (
		<section className="page">
			<div className="content user-content">
				<header className="user-page-header">
					<TextField
						id="searchQuery"
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
				{formattedUsers && formattedUsers?.length > 0 && (
					<>
						<DataGrid
							columns={columns}
							rows={formattedUsers || []}
							pageSize={users?.data?.size}
							loading={users?.isLoading}
							rowCount={users?.data?.totalElements || 0}
							onPageSizeChange={newPageSize =>
								setPageSize(newPageSize)
							}
							rowsPerPageOptions={ROWS_OPTIONS}
							pagination
							paginationMode="server"
							sortingMode="server"
							sortModel={sortModel}
							onSortModelChange={model => setSortModel(model)}
							localeText={locale}
							onPageChange={onPageChange}
							getRowClassName={params =>
								`${
									params.row.activated
										? ""
										: "bg-warning text-white"
								}`
							}
						/>
						<i>
							* Les utilisateurs désactivés ne peuvent plus se
							connecter
						</i>
					</>
				)}
			</div>
		</section>
	)
}

export default UserAdminPage
