// GLOBAL CONSTANTS

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import GroupIcon from "@mui/icons-material/Group"
import DomainIcon from "@mui/icons-material/Domain"

import ApartmentIcon from "@mui/icons-material/Apartment"
import WorkIcon from "@mui/icons-material/Work"
import ReactSelectOption from "../api/models/reactSelectOption"
import Role from "../enums/Role"

export const STUDENT_PERIOD_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "15 jours à 2 mois",
		value: "15 jours à 2 mois",
	},
	{
		label: "2 à 6 mois",
		value: "2 à 6 mois",
	},
]

export const JOB_SEEKER_PERIOD_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "3 à 5 jours découverte",
		value: "3 à 5 jours découverte",
	},
	{
		label: "10 à 15 jours pour confirmation de projet",
		value: "10 à 15 jours pour confirmation de projet",
	},
	{
		label: "Durée variable Stage formation professionnelle continue",
		value: "Durée variable Stage formation professionnelle continue",
	},
]

export const STATUS_COLLEGE_STUDENT: string = "Collégien"

export const STATUS_HIGH_SCHOOL_STUDENT: string = "Lycéen"

export const STATUS_STUDENT: string = "Etudiant"

export const STATUS_JOB_SEEKER: string = "Demandeur d'emploi"

export const STATUS_COLLEGE_STUDENT_PERIOD: string = "3 à 5 jours de découverte"

export const STATUS_HIGH_SCHOOL_STUDENT_PERIOD: string =
	"Bac professionnel/Technique jusqu’à 8 semaines de stages"

export interface INavLink {
	text: string
	Icon: any
	url: string | null
	roles: Array<string>
	onClick?: any
	subMenu?: Array<ISubMenuItem>
}

export interface ISubMenuItem {
	text: string
	url: string | null
	Icon: any
}

export const NAV_LINK_ARRAY: Array<INavLink> = [
	{
		url: "/companies",
		text: "Entreprises",
		Icon: ApartmentIcon,
		roles: [],
	},
	{
		url: null,
		text: "Administration",
		Icon: AdminPanelSettingsIcon,
		roles: [Role.ADMIN],
		subMenu: [
			{
				text: "Entreprises",
				url: "/admin/companies",
				Icon: ApartmentIcon,
			},
			{
				text: "Utilisateurs",
				url: "/admin/users",
				Icon: GroupIcon,
			},
			{
				text: "Domaines d'activité",
				url: "/admin/activities",
				Icon: DomainIcon,
			},
			{
				text: "Métiers",
				url: "/admin/jobs",
				Icon: WorkIcon,
			},
		],
	},
]
