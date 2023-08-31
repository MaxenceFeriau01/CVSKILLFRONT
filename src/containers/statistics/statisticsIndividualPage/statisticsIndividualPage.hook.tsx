import { SetStateAction, useState } from "react"
import { useQuery } from "react-query"
import * as XLSX from "xlsx"
import userService from "../../../api/services/userService"
import { PAGE_SIZE_DEFAULT } from "./statisticsIndividualPage.constant"

function useStatisticsIndividualPage(initialPage = 0, initialPageSize = 20) {
	const [searchName, setSearchName] = useState<string>("")
	const [searchFirstName, setSearchFirstName] = useState<string>("")
	const [searchPostalCode, setSearchPostalCode] = useState<any>("")
	const [searchStatus, setSearchStatus] = useState<any>("")
	const [currentPage, setCurrentPage] = useState(0)
	let [filteredRows, setFilteredRows] = useState<any>([])
	const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_DEFAULT)
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
				.getAllPaginated({
					page: currentPage,
					size: pageSize,
					name: searchName !== "" ? searchName : null,
					firstName: searchFirstName !== "" ? searchFirstName : null,
					postalCode:
						searchPostalCode !== "" ? searchPostalCode : null,
					statut: searchStatus !== "" ? searchStatus : null,
				})
				.then(res => {
					setFilteredRows(res.content)
					return res
				}),
		{
			keepPreviousData: true,
		}
	)
	const onChangeName = (evt: any) => {
		evt.preventDefault()
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

	filteredRows = individualStatsQuery?.data?.content
	if (searchFirstName) {
		filteredRows = individualStatsQuery?.data?.content.filter(
			(row: { firstName: string }) =>
				row.firstName
					.toLowerCase()
					.includes(searchFirstName.toLowerCase())
		)
	}
	if (searchName) {
		filteredRows = individualStatsQuery?.data?.content.filter(
			(row: { name: string }) =>
				row.name.toLowerCase().includes(searchName.toLowerCase())
		)
	}
	if (searchPostalCode) {
		const postalCodeToNumber = parseInt(searchPostalCode, 10)
		filteredRows = individualStatsQuery?.data?.content.filter(
			(row: { postalCode: number }) =>
				row.postalCode === postalCodeToNumber
		)
	}
	if (searchStatus) {
		filteredRows = individualStatsQuery?.data?.content.filter(
			(row: { internStatus: { name: string } }) =>
				row.internStatus.name
					.toLowerCase()
					.includes(searchStatus.toLowerCase())
		)
	}
	filteredRows = filteredRows?.map(
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
	const rows = filteredRows || []
	const loading = individualStatsQuery?.isLoading
	const rowCount = individualStatsQuery?.data?.totalElements || 0
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
