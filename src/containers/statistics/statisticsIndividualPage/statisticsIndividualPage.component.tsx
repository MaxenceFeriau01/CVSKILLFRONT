import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import TextField from "@mui/material/TextField/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react"
import {
	LOCALE_LANG,
	PAGE_SIZE_OPTIONS,
	TABLE_COLUMNS,
} from "./statisticsIndividualPage.constant"
import useStatisticsIndividualPage from "./statisticsIndividualPage.hook"

function StatisticsIndividualPage() {
	const [searchName, setSearchName] = useState<string>("")
	const [searchFirstName, setSearchFirstName] = useState<string>("")
	const [searchPostalCode, setSearchPostalCode] = useState<any>("")
	const { individualStatsQuery } = useStatisticsIndividualPage()
	const onChangeName = (evt: any) => {
		evt.preventDefault()
		setSearchName(evt.target.value)
		console.log(evt.target.value)
		console.log(individualStatsQuery?.data)
	}
	const onChangeFirstName = (evt: any) => {
		evt.preventDefault()
		setSearchFirstName(evt.target.value)
		console.log("Search First Name:", evt.target.value)
		console.log(filteredRows)
	}
	const onChangePostalCode = (evt: any) => {
		evt.preventDefault()
		setSearchPostalCode(evt.target.value)
		console.log("Search First Name:", evt.target.value)
		console.log(filteredRows)
	}
/* eslint-disable */
	// prettier-ignore
	let filteredRows : any = individualStatsQuery?.data

	if (searchFirstName) {
		filteredRows = individualStatsQuery?.data?.filter(row =>
			row.firstName
					.toLowerCase()
					.includes(
						searchFirstName.toLowerCase())
		)
	}
	if (searchName) {
		filteredRows = individualStatsQuery?.data?.filter(row =>
			row.name
				.toLowerCase()
				.includes(
					searchName.toLowerCase())
		)
	}
	if (searchPostalCode) {
		const postalCodeToNumber = parseInt(searchPostalCode)
		filteredRows = individualStatsQuery?.data?.filter(row =>
			row.postalCode === postalCodeToNumber
		)
	}
		

		/* eslint-enable */
	return (
		<section className="page">
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
					label="Rechercher par code postale"
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
			</header>
			<div className="content h-full p-3">
				<DataGrid
					columns={TABLE_COLUMNS}
					rows={filteredRows || []}
					loading={individualStatsQuery?.isLoading}
					pagination
					localeText={LOCALE_LANG}
					rowsPerPageOptions={PAGE_SIZE_OPTIONS}
				/>
			</div>
		</section>
	)
}

export default StatisticsIndividualPage
