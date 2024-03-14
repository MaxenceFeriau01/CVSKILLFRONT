// eslint-disable-next-line import/prefer-default-export
import * as XLSX from "xlsx"
import dayjs from "dayjs"
import User from "../api/models/user"
import Company from "../api/models/company"

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

export const exportCompanyCsv = (companies: Company[], fileName: string) => {
	const ws = XLSX.utils.json_to_sheet(
		companies.map(c => ({
			ID: c.id,
			Nom: c.name,
			Actif: c.activated ? "Oui" : "Non",
			Type: c.type,
			Description: c.description.replace(/(\r\n|\n|\r)/gm, " "),
			"Site web": c.websiteUrl,
			"Numéro de SIRET": c.siret,
			Activités: c.activities.map(a => a.name).join(","),
			Adresse: c.address,
			"Code postal": c.city?.postalCode,
			Ville: c.city?.name,
			Département: c.department,
			"Prénom Contact": c.contactFirstName,
			"Nom Contact": c.contactLastName,
			"Email Contact": c.contactMail,
			"Téléphone Fixe Contact": c.fixContactNum,
			"Téléphone Portable Contact": c.contactNum,
			"Activités recherchés": c.searchedActivities
				.map(sa => sa.name)
				.join(","),
			"Métiers recherchés": c.searchedJobs.map(sj => sj.name).join(","),
			"Stagiaires acceptés": c.searchedInternsType
				.map(sit => sit.internStatus.name)
				.join(","),
			"Périodes acceptés": c.searchedInternsType
				.map(sit => sit.periods.join(","))
				.join(","),
			"Stages rémunérés": c.isPaidAndLongTermInternship ? "Oui" : "Non",
			"Mineurs acceptés": c.minorAccepted ? "Oui" : "Non",
			"Nombres de stagiaires acceptés": c.desiredInternsNumber,
		}))
	)
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, "Entreprises")
	XLSX.writeFile(wb, `${fileName}.csv`)
}
