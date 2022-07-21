import ReactSelectOption from "../../api/models/reactSelectOption"

export const STEPS: Array<string> = [
	"Qui êtes-vous?",
	"Où vous contacter?",
	"Que recherchez-vous?",
]

export const INPUT_FORM_ONE: Array<string> = ["type", "name", "siret"]

export const INPUT_FORM_THREE: Array<string> = [
	"searchedInternsType",
	"searchedActivities",
	"searchedJobs",
	"paidAndLongTermInternship",
	"desiredInternsNumber",
	"minorAccepted",
]
export const MAX_STEP_NUMBER: number = STEPS.length

export const TYPE_COMPANY_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "Entreprise",
		value: "Entreprise",
	},
	{
		label: "Association",
		value: "Association",
	},
	{
		label: "Collectivité",
		value: "Collectivité",
	},
	{
		label: "EPLE",
		value: "EPLE",
	},
	{
		label: "Etablissement public national scientifique, culturel et professionnel (EPSCP)",
		value: "Etablissement public national scientifique, culturel et professionnel (EPSCP)",
	},
]

export const INTERN_NUMBER_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "1 à 5",
		value: "1 à 5",
	},
	{
		label: "5 à 10",
		value: "5 à 10",
	},
	{
		label: "10 et plus",
		value: "10 et plus",
	},
]
