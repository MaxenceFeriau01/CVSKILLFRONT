import ReactSelectOption from "../../api/models/reactSelectOption"
import SearchSubject from "../../enums/SearchSubject"

export const CIVILITY_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "M",
		value: "M",
	},
	{
		label: "Mme",
		value: "Mme",
	},
]

export const ROLES : Array<ReactSelectOption> = [
	{ value: "1", label: 'ROLE_ADMIN' },
	{ value: "2", label: 'ROLE_COMPANY'},
	{ value: "3", label: 'ROLE_USER' }
	]

export const DIPLOMA_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "CAP",
		value: "CAP",
	},
	{
		label: "BAC",
		value: "BAC",
	},
	{
		label: "BAC + 1",
		value: "BAC + 1",
	},
	{
		label: "BAC + 2",
		value: "BAC + 2",
	},
	{
		label: "BAC + 3",
		value: "BAC + 3",
	},
	{
		label: "BAC + 4",
		value: "BAC + 4",
	},
	{
		label: "BAC + 5",
		value: "BAC + 5",
	},
	{
		label: "BAC + 6",
		value: "BAC + 6",
	},
	{
		label: "BAC + 7",
		value: "BAC + 7",
	},
	{
		label: "BAC + 8",
		value: "BAC + 8",
	},
]

export const SEARCH_OPTIONS: Array<ReactSelectOption> = [
	{
		label: "Stage",
		value: SearchSubject.INTERNSHIP,
	},
	{
		label: "Alternance",
		value: SearchSubject.WORK_STUDY,
	},
]
