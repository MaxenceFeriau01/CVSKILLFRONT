import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"

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
import jobService from "../../../api/services/jobService"
import Job from "../../../api/models/job"
import { PAGE, ROWS_OPTIONS, SIZE } from "./constant"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function JobAdminPage() {
	const [search, setSearch] = useState<string>("")
	const [pageSize, setPageSize] = useState<number>(SIZE)
	const [pageNumber, setPageNumber] = useState<number>(PAGE)
	const queryClient = useQueryClient()

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
			getActions: job => {
				return [
					<GridActionsCellItem
						icon={
							<DeleteIcon
								color={`${
									checkIfCanDelete(job.row)
										? "error"
										: "disabled"
								}`}
							/>
						}
						label="Supprimer"
						title="Supprimer"
						disabled={!checkIfCanDelete(job.row)}
						onClick={() => handleDeleteClick(job.id)}
					/>,
				]
			},
		},
	]

	function checkIfCanDelete(job: any) {
		return job.companyCount === 0 && job.userCount === 0
	}

	const jobs = useQuery(
		["jobs", pageNumber, search, pageSize],
		() =>
			jobService.getAllPaginated({
				page: pageNumber,
				size: pageSize,
				name: search !== "" ? search : null,
			}),
		{
			keepPreviousData: true,
		}
	)

	const postJob = useMutation((job: Job) => jobService.post(job), {
		onSuccess: () => {
			jobs.refetch()
			Swal.fire({
				title: "Ce métier a bien été créé.",
				icon: "success",
				position: "bottom-end",
				showConfirmButton: false,
				timer: 1500,
			})
		},

		onError: () => {
			Swal.showValidationMessage(
				"Erreur, veuillez recommencer la saisie."
			)
		},
	})

	const putJob = useMutation((job: Job) => jobService.put(job, job.id), {
		onSuccess: (data: Job) => {
			queryClient.setQueryData(
				["jobs", pageNumber, search, pageSize],
				(old: any) => {
					const lOld = Object.assign(old)

					// Update project percentage
					lOld.content?.forEach((a: Job) => {
						if (a.id === data.id) {
							a.name = data.name
						}
					})
					return lOld
				}
			)
			Swal.fire({
				title: "Ce métier a bien été sauvegardé.",
				icon: "success",
				position: "bottom-end",
				showConfirmButton: false,
				timer: 1500,
			})
		},

		onError: () => {
			Swal.fire({
				title: "Erreur, veuillez recommencer la saisie.",
				icon: "error",
				position: "bottom-end",
				showConfirmButton: false,
				timer: 1500,
			})
		},
	})

	const deleteJob = useMutation((id: string) => jobService.delete(id), {
		onSuccess: () => {
			jobs.refetch()
			Swal.fire({
				title: "Ce job a bien été supprimé.",
				icon: "success",
				position: "bottom-end",
				showConfirmButton: false,
				timer: 1500,
			})
		},

		onError: () => {
			Swal.fire({
				title: "Erreur lors de la suppression.",
				icon: "error",
				position: "bottom-end",
				showConfirmButton: false,
				timer: 1500,
			})
		},
	})

	const onChange = (evt: any) => {
		evt.preventDefault()
		setSearch(evt.target.value)
	}

	const onPageChange = (page: number) => {
		if (page > pageNumber) {
			if (!jobs.isPreviousData) {
				setPageNumber(old => old + 1)
			}
		} else if (page < pageNumber) {
			setPageNumber(old => Math.max(old - 1, 0))
		}
	}

	const handleCellEditCommit = async (params: any) => {
		if (params.value === params.formattedValue) {
			return
		}

		putJob.mutate(new Job(params.id, params.value))
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
				deleteJob.mutate(id.toString())
			}
		})
	}

	const addJob = () => {
		Swal.fire({
			title: "Ajouter un métier",
			input: "text",
			showCancelButton: true,
			confirmButtonText: "Ajouter",
			showLoaderOnConfirm: true,
			preConfirm: (name: string) => {
				if (name !== "") {
					postJob.mutate(new Job(0, name))
				} else {
					Swal.fire({
						title: "Ce champ ne peut pas être vide",
						icon: "error",
						position: "bottom-end",
						showConfirmButton: false,
						timer: 1500,
					})
				}
			},
		})
	}

	return (
		<section className="page">
			<div className="content job-content">
				<header className="job-page-header">
					<TextField
						id="searchJobName"
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
					<Button type="button" onClick={addJob}>
						Ajouter un métier
					</Button>
				</header>

				<DataGrid
					columns={columns}
					rows={jobs?.data?.content || []}
					pageSize={jobs?.data?.size}
					loading={jobs?.isLoading}
					rowCount={jobs?.data?.totalElements || 0}
					pagination
					paginationMode="server"
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					rowsPerPageOptions={ROWS_OPTIONS}
					localeText={locale}
					onPageChange={onPageChange}
					onCellEditCommit={handleCellEditCommit}
				/>
				<i>* Double-clic sur le nom d'un métier pour la modifier</i>
			</div>
		</section>
	)
}

export default JobAdminPage
