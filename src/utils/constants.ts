// GLOBAL CONSTANTS

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import BusinessIcon from "@mui/icons-material/Business"

import ReactSelectOption from "../api/models/reactSelectOption"

export const PERIOD_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "Inférieur à 15 jours",
		value: "Inférieur à 15 jours",
	},
	{
		label: "15 jours à 2 mois",
		value: "15 jours à 2 mois",
	},
	{
		label: "2 à 6 mois",
		value: "2 à 6 mois",
	},
]

export const STATUS_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "Collégien",
		value: "Collégien",
	},
	{
		label: "Lycéen",
		value: "Lycéen",
	},
	{
		label: "Etudiant",
		value: "Etudiant",
	},
	{
		label: "Demandeur d'emploi",
		value: "Demandeur d'emploi",
	},
]

export interface INavLink {
	text: string
	Icon: any
	url: string
}

export const NAV_LINK_ARRAY: Array<INavLink> = [
	{
		url: "/companies",
		text: "Entreprises",
		Icon: BusinessIcon,
	},
	{
		url: "/admin",
		text: "Administration",
		Icon: AdminPanelSettingsIcon,
	},
]
