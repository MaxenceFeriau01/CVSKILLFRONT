import { SetStateAction, useEffect, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import * as XLSX from "xlsx"
import userService from "../../../api/services/userService"
import { PAGE_SIZE_DEFAULT } from "./statisticsIndividualPage.constant"

function useStatisticsIndividualPage(initialPage = 0, initialPageSize = 20) {
	const [searchName, setSearchName] = useState<string>("")
	const [searchFirstName, setSearchFirstName] = useState<string>("")
	const [searchPostalCode, setSearchPostalCode] = useState<any>("")
	const [searchStatus, setSearchStatus] = useState<any>("")
	const [currentPage, setCurrentPage] = useState(0)

	const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_DEFAULT)
	const queryClient = useQueryClient() // Utilisez useQueryClient pour réinitialiser la requête

	// Utilisez un useEffect pour mettre à jour la requête en fonction des champs de recherche
	useEffect(() => {
		// Définissez une fonction pour exécuter la requête en fonction des valeurs actuelles des champs de recherche
		const fetchData = async () => {
			const filters: any = {
				page: currentPage,
				size: pageSize,
				name: searchName !== "" ? searchName : null,
				firstName: searchFirstName !== "" ? searchFirstName : null,
				postalCode: searchPostalCode !== "" ? searchPostalCode : null,
				statut: searchStatus !== "" ? searchStatus : null,
			}

			try {
				const result = await userService.getUserStats(filters)
				// Utilisez queryClient pour réinitialiser la requête avec les nouvelles données
				queryClient.setQueryData(
					[
						"user-stats",
						currentPage,
						pageSize,
						searchName,
						searchFirstName,
						searchPostalCode,
						searchStatus,
					],
					result
				)
			} catch (error) {
				// Gérer les erreurs ici
				console.error(error)
			}
		}

		// Appelez la fonction fetchData lorsque les champs de recherche changent
		fetchData()
	}, [
		searchName,
		searchFirstName,
		searchPostalCode,
		searchStatus,
		currentPage,
		pageSize,
		queryClient,
	])

	const individualStatsQuery = useQuery(
		[
			"user-stats",
			currentPage,
			pageSize,
			searchName,
			searchFirstName,
			searchPostalCode,
			searchStatus,
		],
		() =>
			userService
				.getUserStats({
					page: currentPage,
					size: pageSize,
					name: searchName !== "" ? searchName : null,
					firstName: searchFirstName !== "" ? searchFirstName : null,
					postalCode:
						searchPostalCode !== "" ? searchPostalCode : null,
					statut: searchStatus !== "" ? searchStatus : null,
				})
				.then(res => res),
		{
			keepPreviousData: true,
		}
	)

	let filteredRows: any = individualStatsQuery || []
	const onChangeName = (evt: any) => {
		evt.preventDefault()
		console.log(searchName)
		setSearchName(evt.target.value)
	}
	const onChangeFirstName = (evt: any) => {
		evt.preventDefault()
		setSearchFirstName(evt.target.value)
	}
	const onChangePostalCode = (evt: any) => {
		evt.preventDefault()
		setSearchPostalCode(evt.target.value)
	}
	const onChangeStatus = (evt: any) => {
		evt.preventDefault()
		setSearchStatus(evt.target.value)
	}

	if (searchFirstName) {
		filteredRows = filteredRows?.data?.content.filter(
			(row: { firstName: string }) =>
				row.firstName
					.toLowerCase()
					.includes(searchFirstName.toLowerCase())
		)
	}
	if (searchName) {
		filteredRows = filteredRows?.data?.content.filter(
			(row: { name: string }) =>
				row.name.toLowerCase().includes(searchName.toLowerCase())
		)
	}
	if (searchPostalCode) {
		const postalCodeToNumber = parseInt(searchPostalCode, 10)
		filteredRows = filteredRows?.data?.content.filter(
			(row: { postalCode: number }) =>
				row.postalCode === postalCodeToNumber
		)
	}
	if (searchStatus) {
		filteredRows = filteredRows?.data?.content.filter(
			(row: { internStatus: { name: string } }) =>
				row.internStatus.name
					.toLowerCase()
					.includes(searchStatus.toLowerCase())
		)
	}
	const rows = filteredRows?.data?.content
	console.log("row")
	console.log(rows)
	console.log("filteredRows")
	console.log(filteredRows?.data)
	console.log("individualStatsQuery?")
	console.log(filteredRows.data?.totalElements)
	const loading = individualStatsQuery?.isLoading
	const rowCount = filteredRows?.data?.totalElements || 0
	console.log("rowCount")
	console.log(rowCount)

	filteredRows = filteredRows.data?.content.map(
		(item: { createdDate: string | number | Date }) => ({
			...item,
			createdDate: new Date(item.createdDate),
		})
	)

	const handleExport = (data: any[]) => () => {
		const formattedData = data.map(item => ({
			"Date d'inscription": item.createdDate,
			Civilité: item.civility,
			Nom: item.name,
			Prénom: item.firstName,
			Téléphone: item.phone,
			Email: item.email,
			"Code postal": item.postalCode,
			Statut: item.internStatus ? item.internStatus.name : "",
			"Durée de stage": item.internshipPeriod || "",
			"Niveau de diplôme": item.diploma || "",
			"Nombre de mise à jour du profil": item.updateProfil,
		}))
		const customHeader = [
			"Date d'inscription",
			"Civilité",
			"Nom",
			"Prénom",
			"Téléphone",
			"Email",
			"Code postal",
			"Statut",
			"durée de stage",
			"Niveau de diplome",
			"Nombre de mise à jour du profil",
		]
		const wb = XLSX.utils.book_new()
		const ws = XLSX.utils.json_to_sheet([], { header: customHeader })
		XLSX.utils.sheet_add_json(ws, formattedData, {
			skipHeader: true,
			origin: "A2",
		})

		XLSX.utils.book_append_sheet(wb, ws, "Sheet1")

		XLSX.writeFile(wb, "export_statistique_individuel.xlsx")
	}
	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
		console.log(currentPage)
		console.log(newPage)
	}

	const pageChange = (newPage: number) => {
		handlePageChange(newPage)
	}
	const pageSizeChange = (newPageSize: SetStateAction<number>) => {
		setPageSize(newPageSize)
		setCurrentPage(0)
	}

	return {
		individualStatsQuery,
		rows,
		loading,
		rowCount,
		handleExport,
		pageChange,
		pageSizeChange,
		searchName,
		setSearchName,
		searchFirstName,
		setSearchFirstName,
		searchPostalCode,
		setSearchPostalCode,
		onChangeName,
		onChangeFirstName,
		onChangePostalCode,
		onChangeStatus,
		searchStatus,
		filteredRows,
		pageSize,
	}
}
export default useStatisticsIndividualPage
