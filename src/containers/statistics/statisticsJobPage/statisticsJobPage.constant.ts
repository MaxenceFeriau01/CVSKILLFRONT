import { GridColumns, frFR } from "@mui/x-data-grid"

export const PAGE_SIZE_DEFAULT: number = 20
export const PAGE_SIZE_OPTIONS: Array<number> = [PAGE_SIZE_DEFAULT, 50, 100]

export const LOCALE_LANG = frFR.components.MuiDataGrid.defaultProps.localeText

export const TABLE_COLUMNS: GridColumns = [
	{
		field: "name",
		headerName: "Nom",
		type: "string",
		flex: 0.6,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "userCount",
		headerName: "Nombre d'utilisations par utilisateur",
		type: "number",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
]
