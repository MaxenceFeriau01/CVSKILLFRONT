import { GridColumns, frFR } from "@mui/x-data-grid"
import { useState } from "react"

export const PAGE_SIZE_DEFAULT: number = 20
export const PAGE_SIZE_OPTIONS: Array<number> = [PAGE_SIZE_DEFAULT, 50, 100]

export const LOCALE_LANG = frFR.components.MuiDataGrid.defaultProps.localeText

export const TABLE_COLUMNS: GridColumns = [
	{
		field: "createdDate",
		headerName: "Date d'inscription",
		type: "date",
		flex: 0.6,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "civility",
		headerName: "Civilité",
		type: "string",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "name",
		headerName: "Nom",
		type: "string",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "firstName",
		headerName: "Prénom",
		type: "string",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "phone",
		headerName: "Téléphone",
		type: "number",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "email",
		headerName: "Email",
		type: "string",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "dateOfBirth",
		headerName: "Date de naissance",
		type: "date",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "postalCode",
		headerName: "Code postal",
		type: "number",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "internStatusName",
		headerName: "Statut",
		type: "string",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
		valueGetter: params => params.row?.internStatus?.name,
	},
	{
		field: "internshipPeriod",
		headerName: "Durée de stage",
		type: "number",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "diploma",
		headerName: "Niveau de diplôme",
		type: "string",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "updateProfil",
		headerName: "Nombre de mise à jour du profil",
		type: "number",
		flex: 0.4,
		align: "left",
		headerAlign: "left",
	},
]
export const [search, setSearch] = useState<string>("")
export const onChange = (evt: any) => {
	evt.preventDefault()
	setSearch(evt.target.value)
}
