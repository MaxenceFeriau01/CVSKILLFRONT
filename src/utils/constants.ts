// GLOBAL CONSTANTS

import DomainIcon from "@mui/icons-material/Domain"
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

export const STATUS_OPTIONS: Array<ReactSelectOption | any> = [
	{
		label: STATUS_COLLEGE_STUDENT,
		value: 1,
		period: "3 à 5 jours de découverte",
	},
	{
		label: STATUS_HIGH_SCHOOL_STUDENT,
		value: 2,
		period: "Bac professionnel/Technique jusqu’à 22 semaines de stages",
	},
	{
		label: STATUS_STUDENT,
		value: 3,
	},
	{
		label: STATUS_JOB_SEEKER,
		value: 4,
	},
]

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
		url: "/activities",
		text: "Activités",
		Icon: DomainIcon,
	},
]
