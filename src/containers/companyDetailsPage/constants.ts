import ReactSelectOption from "../../api/models/reactSelectOption"

export const STEPS: Array<string> = [
	"Qui êtes-vous?",
	"Où vous contacter?",
	"Que recherchez-vous?",
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
		label: "Etablissement privé",
		value: "Etablissement privé",
	},
]
