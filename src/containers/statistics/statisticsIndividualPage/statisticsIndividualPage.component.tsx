import React, { useState } from "react"
import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import TextField from "@mui/material/TextField/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { FileDownload } from "@mui/icons-material"
import * as XLSX from "xlsx"
import {
	LOCALE_LANG,
	PAGE_SIZE_DEFAULT,
	PAGE_SIZE_OPTIONS,
	TABLE_COLUMNS,
} from "./statisticsIndividualPage.constant"
import useStatisticsIndividualPage from "./statisticsIndividualPage.hook"

import user from "../../../contexts/user"

function StatisticsIndividualPage() {
	const {
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
		pageSize,
		filteredRows,
		searchStatus,
	} = useStatisticsIndividualPage()
	/* const [searchName, setSearchName] = useState<string>("")
	const [searchFirstName, setSearchFirstName] = useState<string>("")
	const [searchPostalCode, setSearchPostalCode] = useState<any>("")
	const [searchStatus, setSearchStatus] = useState<any>("")
	const [currentPage, setCurrentPage] = useState(0)
	const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_DEFAULT) 
	const { individualStatsQuery, fetchIndividualStats } =
		useStatisticsIndividualPage(currentPage, pageSize)
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

	let filteredRows: any = individualStatsQuery?.data?.content
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
		fetchIndividualStats(newPage, pageSize)
	}
	const rows = filteredRows || []
	const loading = individualStatsQuery?.isLoading
	const rowCount = individualStatsQuery?.data?.totalElements || 0
	const pageChange = (newPage: number) => {
		handlePageChange(newPage)
	}
	const pageSizeChange = (newPageSize: React.SetStateAction<number>) => {
		setPageSize(newPageSize)
		setCurrentPage(0)
	} */
	return (
		<section className="page">
			<div className="content user-content">
				<header className="user-page-header">
					<TextField
						id="searchUserName"
						label="Rechercher par nom"
						value={searchName}
						onChange={onChangeName}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="searchUserFirstName"
						label="Rechercher par prénom"
						value={searchFirstName}
						onChange={onChangeFirstName}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="searchUserPostalCode"
						label="Rechercher par code postal"
						value={searchPostalCode}
						onChange={onChangePostalCode}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						id="searchUserStatus"
						label="Rechercher par status"
						value={searchStatus}
						onChange={onChangeStatus}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<GridActionsCellItem
						icon={<FileDownload color="primary" />}
						label="Exporter"
						// onClick={handleExport(filteredRows.data)}
						title="Exporter"
					/>
				</header>
				<div className="content h-full p-3">
					<DataGrid
						columns={TABLE_COLUMNS}
						rows={rows}
						pageSize={pageSize}
						loading={loading}
						rowCount={rowCount}
						onPageChange={pageChange}
						onPageSizeChange={pageSizeChange}
						pagination
						paginationMode="server"
						localeText={LOCALE_LANG}
						rowsPerPageOptions={PAGE_SIZE_OPTIONS}
					/>
				</div>
			</div>
		</section>
	)
}

export default StatisticsIndividualPage
