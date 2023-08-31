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
						onClick={handleExport(filteredRows)}
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
