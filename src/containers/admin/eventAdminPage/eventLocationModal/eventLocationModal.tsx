import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	InputAdornment,
	TextField,
} from "@mui/material"
import { DataGrid, frFR } from "@mui/x-data-grid"
import { Search } from "@mui/icons-material"
import { EventLocationModalProps, ROWS_OPTIONS } from "./constants"
import useEventLocationModal from "./useEventLocationModal"
import LocationFormModal from "./LocationFormModal/locationFormModal"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function EventLocationModal({ isOpen, closeModal }: EventLocationModalProps) {
	const {
		columns,
		locations,
		query,
		onChange,
		pageNumber,
		onPageChange,
		sizeNumber,
		onPageSizeChange,
		sortModel,
		setSortModel,
		location,
		editionForm,
		openEditionForm,
		closeEditionForm,
	} = useEventLocationModal()

	return (
		<Dialog open={isOpen} onClose={closeModal} maxWidth="xl">
			<DialogTitle>Gestion des lieux</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Ci-dessous, vous pouvez gérer les différents lieux de
					manifestations enregistrés sur l'application DKStages.
				</DialogContentText>
				<div className="location-content">
					<header className="location-table-header my-2">
						<TextField
							id="searchEventByQuery"
							label="Recherche par mot-clé"
							onChange={onChange}
							value={query}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								),
							}}
						/>
						<Button type="button" onClick={openEditionForm}>
							Ajouter un lieu
						</Button>
					</header>
					{locations.data && locations.data?.content?.length > 0 && (
						<div style={{ height: 350, width: "100%" }}>
							<DataGrid
								columns={columns}
								rows={locations.data?.content}
								page={pageNumber}
								pageSize={sizeNumber}
								loading={locations.isLoading}
								rowCount={locations.data?.totalElements || 0}
								onPageChange={onPageChange}
								onPageSizeChange={onPageSizeChange}
								rowsPerPageOptions={ROWS_OPTIONS}
								pagination
								paginationMode="server"
								sortingMode="server"
								sortModel={sortModel}
								onSortModelChange={model => setSortModel(model)}
								localeText={locale}
							/>
						</div>
					)}
				</div>
				<LocationFormModal
					location={location}
					isOpen={editionForm}
					closeModal={closeEditionForm}
				/>
			</DialogContent>
			<DialogActions>
				<Button type="button" onClick={closeModal}>
					Fermer
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EventLocationModal
