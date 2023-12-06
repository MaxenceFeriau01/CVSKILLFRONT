import { GridColumns, frFR } from "@mui/x-data-grid"

export const PAGE_NUMBER_DEFAULT: number = 0
export const PAGE_SIZE_DEFAULT: number = 20
export const PAGE_SIZE_OPTIONS: Array<number> = [PAGE_SIZE_DEFAULT, 50, 100]

export const LOCALE_LANG = frFR.components.MuiDataGrid.defaultProps.localeText

export const TABLE_COLUMNS: GridColumns = [
	{
		field: "createdDate",
		headerName: "Date d'inscription de la personne",
		type: "date",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "civility",
		headerName: "Civilité",
		type: "string",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "name",
		headerName: "Nom",
		type: "string",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "firstName",
		headerName: "Prénom",
		type: "string",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "phone",
		headerName: "Téléphone",
		type: "string",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "email",
		headerName: "Email",
		type: "string",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "dateOfBirth",
		headerName: "Date de naissance",
		type: "string",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "postalCode",
		headerName: "Code postal",
		type: "number",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "internStatus",
		headerName: "Statut",
		type: "string",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "internshipDuration",
		headerName: "Durée de stage de 2 à 6 mois",
		type: "string",
		sortable: false,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "diploma",
		headerName: "Niveau de diplôme",
		type: "string",
		align: "left",
		headerAlign: "left",
	},
	{
		field: "applyingNumbers",
		headerName: "Nombre de démarches effectuées par la personne",
		type: "number",
		sortable: false,
		align: "left",
		headerAlign: "left",
	},
	{
		field: "profileUpdateCount",
		headerName: "Nombre de mises à jour du profil",
		type: "number",
		align: "left",
		headerAlign: "left",
	},
]
