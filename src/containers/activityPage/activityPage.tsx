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
import activityService from "../../api/services/activityService"
import Activity from "../../api/models/activity"
import { PAGE, SIZE } from "./constant"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function ActivityPage() {
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
			headerName: "Entreprise(s) liée(s)",
			type: "number",
			editable: true,
			flex: 0.2,
		},
		{
			field: "companySearchCount",
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
						disabled={!checkIfCanDelete(activity.row)}
						onClick={() => handleDeleteClick(activity.id)}
						touchrippleref="true"
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
		["activities", pageNumber, search],
		() =>
			activityService.getAllPaginated({
				page: pageNumber,
				size: SIZE,
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
					title: "Cette activité a bien été sauvegardée.",
					icon: "success",
					position: "bottom-end",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
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
			onSuccess: () => {
				activities.refetch()
				Swal.fire({
					title: "Cette activité a bien été sauvegardée.",
					icon: "success",
					position: "bottom-end",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				})
			},

			onError: () => {
				Swal.fire({
					title: "Erreur, veuillez recommencer la saisie.",
					icon: "error",
					position: "bottom-end",
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
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
					title: "Cette activité a bien été supprimée.",
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
			title: "Ajouter une activité",
			input: "text",
			showCancelButton: true,
			confirmButtonText: "Ajouter",
			showLoaderOnConfirm: true,
			preConfirm: (name: string) => {
				postActivity.mutate(new Activity(0, name))
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
						Ajouter une activité
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
					rowsPerPageOptions={[20]}
					localeText={locale}
					onPageChange={onPageChange}
					onCellEditCommit={handleCellEditCommit}
				/>
				<i>* Double-clic sur le nom d'une activité pour la modifier</i>
			</div>
		</section>
	)
}

export default ActivityPage