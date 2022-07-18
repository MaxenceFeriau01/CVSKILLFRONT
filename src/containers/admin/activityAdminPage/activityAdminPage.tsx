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
import activityService from "../../../api/services/activityService"
import Activity from "../../../api/models/activity"
import { PAGE, ROWS_OPTIONS, SIZE } from "./constant"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function ActivityAdminPage() {
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
			headerName: "Nom ",
			type: "string",
			editable: true,
			headerClassName: "info-cell",
			flex: 0.2,
		},
		{
			field: "companyCount",
			headerName: "Entreprise(s) liée(s)",
			type: "number",
			flex: 0.2,
		},
		{
			field: "companySearchCount",
			headerName: "Entreprise(s) qui recherche(nt)",
			type: "number",
			flex: 0.2,
		},
		{
			field: "userCount",
			headerName: "Utilisateur(s) qui recherche(nt)",
			type: "number",
			flex: 0.2,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Action",
			cellClassName: "actions",
			flex: 0.1,
			// eslint-disable-next-line arrow-body-style
			getActions: activity => {
				return [
					<GridActionsCellItem
						icon={
							<DeleteIcon
								color={`${
									checkIfCanDelete(activity.row)
										? "error"
										: "disabled"
								}`}
							/>
						}
						label="Supprimer"
						titile="Supprimer"
						disabled={!checkIfCanDelete(activity.row)}
						onClick={() => handleDeleteClick(activity.id)}
					/>,
				]
			},
		},
	]

	function checkIfCanDelete(activity: any) {
		return (
			activity.companyCount === 0 &&
			activity.companySearchCount === 0 &&
			activity.userCount === 0
		)
	}

	const activities = useQuery(
		["activities", pageNumber, search, pageSize],
		() =>
			activityService.getAllPaginated({
				page: pageNumber,
				size: pageSize,
				name: search !== "" ? search : null,
			}),
		{
			keepPreviousData: true,
		}
	)

	const postActivity = useMutation(
		(activity: Activity) => activityService.post(activity),
		{
			onSuccess: () => {
				activities.refetch()
				Swal.fire({
					title: "Ce domaine d'activité a bien été créée.",
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
		}
	)

	const putActivity = useMutation(
		(activity: Activity) => activityService.put(activity, activity.id),
		{
			onSuccess: (data: Activity) => {
				queryClient.setQueryData(
					["activities", pageNumber, search, pageSize],
					(old: any) => {
						const lOld = Object.assign(old)

						lOld.content?.forEach((a: Activity) => {
							if (a.id === data.id) {
								a.name = data.name
							}
						})
						return lOld
					}
				)
				Swal.fire({
					title: "Ce domaine d'activité a bien été sauvegardée.",
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
		}
	)

	const deleteActivity = useMutation(
		(id: string) => activityService.delete(id),
		{
			onSuccess: () => {
				activities.refetch()
				Swal.fire({
					title: "Ce domaine d'activité a bien été supprimée.",
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
		}
	)

	const onChange = (evt: any) => {
		evt.preventDefault()
		setSearch(evt.target.value)
	}

	const onPageChange = (page: number) => {
		if (page > pageNumber) {
			if (!activities.isPreviousData) {
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

		putActivity.mutate(new Activity(params.id, params.value))
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
				deleteActivity.mutate(id.toString())
			}
		})
	}

	const addActivity = () => {
		Swal.fire({
			title: "Ajouter un domaine d'activité",
			input: "text",
			showCancelButton: true,
			confirmButtonText: "Ajouter",
			showLoaderOnConfirm: true,
			preConfirm: (name: string) => {
				if (name !== "") {
					postActivity.mutate(new Activity(0, name))
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
			<div className="content activity-content">
				<header className="activity-page-header">
					<TextField
						id="searchActivityName"
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
					<Button type="button" onClick={addActivity}>
						Ajouter un domaine d'activité
					</Button>
				</header>

				<DataGrid
					columns={columns}
					rows={activities?.data?.content || []}
					pageSize={activities?.data?.size}
					loading={activities?.isLoading}
					rowCount={activities?.data?.totalElements || 0}
					pagination
					paginationMode="server"
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					rowsPerPageOptions={ROWS_OPTIONS}
					localeText={locale}
					onPageChange={onPageChange}
					onCellEditCommit={handleCellEditCommit}
				/>
				<i>* Double-clic sur le nom d'une activité pour la modifier</i>
			</div>
		</section>
	)
}

export default ActivityAdminPage
