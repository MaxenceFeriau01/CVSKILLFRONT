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

export const STATUS_COLLEGE_STUDENT: string = "Collégien"

export const STATUS_HIGH_SCHOOL_STUDENT: string = "Lycéen"

export const STATUS_STUDENT: string = "Etudiant"

export const STATUS_JOB_SEEKER: string = "Demandeur d'emploi"

export const STATUS_COLLEGE_STUDENT_PERIOD: string = "3 à 5 jours de découverte"

export const STATUS_HIGH_SCHOOL_STUDENT_PERIOD: string =
	"Bac professionnel/Technique jusqu’à 22 semaines de stages"

export interface INavLink {
	text: string
	Icon: any
	url: string
	onClick?: any
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
