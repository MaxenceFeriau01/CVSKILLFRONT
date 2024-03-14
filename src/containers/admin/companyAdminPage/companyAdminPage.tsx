import { useNavigate } from "react-router-dom"
import { Button, InputAdornment, TextField } from "@mui/material"
import { DataGrid, frFR } from "@mui/x-data-grid"
import SearchIcon from "@mui/icons-material/Search"
import { ROWS_OPTIONS } from "./constant"
import CompanyViewPreview from "./companyViewPreview"
import useCompanyAdminPage from "./useCompanyAdminPage"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function CompanyAdminPage() {
	const navigate = useNavigate()
	const {
		search,
		onChange,
		companies,
		onPageChange,
		formattedCompanies,
		onPageSizeChange,
		companyIdPreview,
		columns,
		sortModel,
		setSortModel,
		setOpenPreviewModal,
		openPreviewModal,
		setExcel,
	} = useCompanyAdminPage()

	return (
		<section className="page">
			<div className="content company-content">
				<header className="company-page-header">
					<div className="flex flex-row space-between items-center">
						<TextField
							id="searchCompanyName"
							label="Rechercher par nom"
							className="mr-2"
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
					</div>
					<Button
						type="button"
						onClick={() => navigate("/new-company")}
					>
						Ajouter une entreprise
					</Button>
				</header>
				{formattedCompanies && formattedCompanies?.length > 0 && (
					<>
						<DataGrid
							columns={columns}
							rows={formattedCompanies || []}
							pageSize={companies?.data?.size}
							loading={companies?.isLoading}
							rowCount={companies?.data?.totalElements || 0}
							onPageSizeChange={onPageSizeChange}
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
							* Les entreprises désactivées n'apparaissent plus
							dans la liste de recherche
						</i>
					</>
				)}
			</div>
			<CompanyViewPreview
				openModal={openPreviewModal}
				setOpenModal={setOpenPreviewModal}
				companyId={companyIdPreview}
			/>
		</section>
	)
}

export default CompanyAdminPage
