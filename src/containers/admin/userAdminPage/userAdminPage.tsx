import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import { Button, InputAdornment, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import {
	DataGrid,
	frFR,
	GridActionsCellItem,
	GridColumns,
	GridRowId,
} from "@mui/x-data-grid"

import Swal from "sweetalert2"
import SearchIcon from "@mui/icons-material/Search"
import { Edit } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import userService from "../../../api/services/userService"
import { PAGE, ROWS_OPTIONS, SIZE } from "./constant"
import Activity from "../../../api/models/activity"
import User from "../../../api/models/user"

const locale = frFR.components.MuiDataGrid.defaultProps.localeText

function UserAdminPage() {
	const [search, setSearch] = useState<string>("")
	const [pageSize, setPageSize] = useState<number>(SIZE)
	const [formattedUsers, setFormattedUsers] = useState<any>([])
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const [pageNumber, setPageNumber] = useState<number>(PAGE)

	const columns: GridColumns = [
		{
			field: "activated",
			headerName: "Activé *",
			type: "boolean",
			flex: 0.1,
		},
		{
			field: "name",
			headerName: "Nom",
			type: "string",

			flex: 0.2,
		},
		{
			field: "firstName",
			headerName: "Prénom",
			type: "string",
			flex: 0.2,
		},

		{
			field: "email",
			headerName: "Email",
			type: "string",
			flex: 0.2,
		},
		{
			field: "internStatus",
			headerName: "Status",
			type: "string",
			flex: 0.2,
		},
		{
			field: "civility",
			headerName: "Civilité",
			type: "string",
			flex: 0.1,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			cellClassName: "actions",
			flex: 0.2,
			// eslint-disable-next-line arrow-body-style
			getActions: user => {
				return [
					<GridActionsCellItem
						icon={<Edit color="secondary" />}
						label="Modifier"
						onClick={() => navigate(`/user-details/${user.id}`)}
						title="Modifier"
					/>,
					user.row.activated ? (
						<GridActionsCellItem
							icon={<RadioButtonCheckedIcon color="warning" />}
							title="Désactiver"
							label="Désactiver"
							onClick={() => handleDeactivateClick(user.id)}
						/>
					) : (
						<GridActionsCellItem
							icon={
								<RadioButtonUncheckedIcon className="uncheck" />
							}
							title="Activer"
							label="Activer"
							onClick={() =>
								postActive.mutate({
									userId: +user.id,
									activated: true,
								})
							}
						/>
					),

					<GridActionsCellItem
						icon={<DeleteIcon color="error" />}
						label="Supprimer"
						title="Supprimer"
						onClick={() => handleDeleteClick(user.id)}
					/>,
				]
			},
		},
	]

	const users = useQuery(
		["users", pageNumber, search, pageSize],
		() =>
			userService
				.getAllPaginated({
					page: pageNumber,
					size: pageSize,
					name: search !== "" ? search : null,
				})
				.then(res => {
					res.content.forEach((c: any) => {
						c.internStatus = c?.internStatus?.name
					})
					setFormattedUsers(res.content)
					return res
				}),
		{
			keepPreviousData: true,
		}
	)
	const postActive = useMutation(
		({ activated, userId }: any) => userService.active(activated, userId),
		{
			onSuccess: (data, variables) => {
				let text: string = "L'utilisateur a été activé !"
				let icon: any = "success"
				if (variables.activated === false) {
					text = "L'utilisateur a été désactivé !"
					icon = "warning"
				}
				Swal.fire({
					position: "bottom-end",
					title: "",
					text,
					icon,
					timer: 1500,
				})

				const lOld = [...formattedUsers]

				lOld.forEach((c: User) => {
					if (c.id === variables.userId) {
						c.activated = variables.activated
					}
				})
				setFormattedUsers(lOld)
				queryClient.setQueryData(
					["users", pageNumber, search, pageSize],
					(old: any) => {
						const oldOne = Object.assign(old)

						// Update project percentage
						oldOne.content = lOld
						return lOld
					}
				)
			},
		}
	)

	const deleteUser = useMutation((id: string) => userService.delete(id), {
		onSuccess: () => {
			users.refetch()
			Swal.fire({
				title: "Cet utilisateur a bien été supprimé.",
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

	function handleDeactivateClick(id: GridRowId) {
		Swal.fire({
			title: "Êtes-vous sûr de le désactiver?",
			text: "Cet utilisateur ne pourra plus se connecter !",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Oui, désactiver !",
			cancelButtonText: "Annuler",
		}).then(result => {
			if (result.isConfirmed) {
				postActive.mutate({
					userId: +id,
					activated: false,
				})
			}
		})
	}

	const handleDeleteClick = async (id: GridRowId) => {
		Swal.fire({
			title: "Êtes-vous sûr?",
			text: "Cet utilisateur n'existera plus !",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Oui, supprimer !",
			cancelButtonText: "Annuler",
		}).then(result => {
			if (result.isConfirmed) {
				deleteUser.mutate(id.toString())
			}
		})
	}

	const onChange = (evt: any) => {
		evt.preventDefault()
		setSearch(evt.target.value)
	}

	const onPageChange = (page: number) => {
		if (page > pageNumber) {
			if (!users.isPreviousData) {
				setPageNumber(old => old + 1)
			}
		} else if (page < pageNumber) {
			setPageNumber(old => Math.max(old - 1, 0))
		}
	}

	return (
		<section className="page">
			<div className="content user-content">
				<header className="user-page-header">
					<TextField
						id="searchUserName"
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
				</header>
				{formattedUsers && formattedUsers?.length > 0 && (
					<>
						<DataGrid
							columns={columns}
							rows={formattedUsers || []}
							pageSize={users?.data?.size}
							loading={users?.isLoading}
							rowCount={users?.data?.totalElements || 0}
							onPageSizeChange={newPageSize =>
								setPageSize(newPageSize)
							}
							rowsPerPageOptions={ROWS_OPTIONS}
							pagination
							paginationMode="server"
							localeText={locale}
							onPageChange={onPageChange}
							getRowClassName={params =>
								`${
									params.row.activated
										? ""
										: "bg-warning text-white"
								}`
							}
						/>
						<i>
							* Les utilisateurs désactivés ne peuvent plus se
							connecter
						</i>
					</>
				)}
			</div>
		</section>
	)
}

export default UserAdminPage
