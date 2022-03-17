import { useState } from "react"
import { useMutation, useQuery } from "react-query"

import { Button, InputAdornment, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import {
	DataGrid,
	frFR,
	GridActionsCellItem,
	GridColumns,
	GridRowId,
} from "@mui/x-data-grid"

import Swal from "sweetalert2"
import SearchIcon from "@mui/icons-material/Search"
import companyService from "../../../api/services/companyService"
import { PAGE, SIZE } from "./constant"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function CompanyAdminPage() {
	const [search, setSearch] = useState<string>("")

	const [pageNumber, setPageNumber] = useState<number>(PAGE)

	const columns: GridColumns = [
		{
			field: "id",
			headerName: "Numéro",
			type: "string",
			flex: 0.1,
		},
		{
			field: "name",
			headerName: "Nom *",
			type: "string",
			editable: true,
			flex: 0.2,
		},
		{
			field: "companyCount",
			headerName: "Entreprise(s) qui recherche(nt)",
			type: "number",
			editable: true,
			flex: 0.2,
		},
		{
			field: "userCount",
			headerName: "Utilisateur(s) qui recherche(nt)",
			type: "number",
			editable: true,
			flex: 0.2,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Action",
			cellClassName: "actions",
			flex: 0.1,
			// eslint-disable-next-line arrow-body-style
			getActions: company => {
				return [
					<GridActionsCellItem
						icon={<DeleteIcon color="error" />}
						label="Supprimer"
						onClick={() => handleDeleteClick(company.id)}
					/>,
				]
			},
		},
	]

	const companies = useQuery(
		["companies", pageNumber, search],
		() =>
			companyService.getAllPaginated({
				page: pageNumber,
				size: SIZE,
				name: search !== "" ? search : null,
			}),
		{
			keepPreviousData: true,
		}
	)

	const deleteCompany = useMutation(
		(id: string) => companyService.delete(id),
		{
			onSuccess: () => {
				companies.refetch()
				Swal.fire({
					title: "Ce company a bien été supprimé.",
					icon: "success",
					position: "bottom-end",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				})
			},

			onError: () => {
				Swal.fire({
					title: "Erreur lors de la suppression.",
					icon: "error",
					position: "bottom-end",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				})
			},
		}
	)

	const onChange = (evt: any) => {
		evt.preventDefault()
		setSearch(evt.target.value)
	}

	const onPageChange = (page: number) => {
		if (page > pageNumber) {
			if (!companies.isPreviousData) {
				setPageNumber(old => old + 1)
			}
		} else if (page < pageNumber) {
			setPageNumber(old => Math.max(old - 1, 0))
		}
	}

	const handleDeleteClick = async (id: GridRowId) => {
		Swal.fire({
			title: "Êtes-vous sûr?",
			text: "Vous ne pourrez pas revenir en arrière !",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Oui, supprimer !",
			cancelButtonText: "Annuler",
		}).then(result => {
			if (result.isConfirmed) {
				deleteCompany.mutate(id.toString())
			}
		})
	}

	return (
		<section className="page">
			<div className="content company-content">
				<header className="company-page-header">
					<TextField
						id="searchCompanyName"
						label="Rechercher par nom"
						value={search}
						onChange={onChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<Button type="button">Ajouter un métier</Button>
				</header>

				<DataGrid
					columns={columns}
					rows={companies?.data?.content || []}
					pageSize={companies?.data?.size}
					loading={companies?.isLoading}
					rowCount={companies?.data?.totalElements || 0}
					pagination
					paginationMode="server"
					rowsPerPageOptions={[20]}
					localeText={locale}
					onPageChange={onPageChange}
				/>
				<i>* Double-clic sur le nom d'une company pour la modifier</i>
			</div>
		</section>
	)
}

export default CompanyAdminPage
