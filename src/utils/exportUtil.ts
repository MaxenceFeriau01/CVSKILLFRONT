// eslint-disable-next-line import/prefer-default-export
import * as XLSX from "xlsx"
import dayjs from "dayjs"
import User from "../api/models/user"

export const exportItem = (item: any, fileName: string) => {
	const data = `data:application/json;charset=UTF-8,${encodeURIComponent(
		JSON.stringify(item)
	)}`
	const link = document.createElement("a")
	link.setAttribute("href", data)
	link.setAttribute("download", `${fileName}.json`)
	link.click()
	link.remove()
}

export const exportExcel = (users: User[], fileName: string) => {
	const ws = XLSX.utils.json_to_sheet(
		users.map(user => {
			const duration = dayjs(
				dayjs(user.internshipEndDate).diff(user.internshipStartDate)
			).month()
			return {
				"Date d'inscription de la personne": user.createdDate,
				Civilité: user.civility,
				Nom: user.name,
				Prénom: user.firstName,
				Téléphone: user.phone,
				Email: user.email,
				"Date de naissance": user.dateOfBirth,
				"Code postal": user.postalCode,
				Statut: user.internStatus.name,
				"Durée de stage de 2 à 6 mois":
					duration >= 2 && duration <= 6 ? duration : null,
				"Niveau de diplôme": user.diploma,
				"Nombre de démarches effectuées par la personne":
					user.appliedCompanies?.length,
				"Nombre de mises à jour du profil": user.profileUpdateCount,
			}
		})
	)
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, "Utilisateurs")
	XLSX.writeFile(wb, `${fileName}.xlsx`)
}
