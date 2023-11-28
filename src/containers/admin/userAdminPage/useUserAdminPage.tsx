import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {
	GridActionsCellItem,
	GridColumns,
	GridRowId,
	GridSortModel,
} from "@mui/x-data-grid"
import FileDownload from "@mui/icons-material/FileDownload"
import { Edit } from "@mui/icons-material"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import DeleteIcon from "@mui/icons-material/Delete"
import Swal from "sweetalert2"
import { PAGE, SIZE } from "./constant"
import userService from "../../../api/services/userService"
import User from "../../../api/models/user"
import { exportItem } from "../../../utils/exportUtil"

function useUserAdminPage() {
	const [search, setSearch] = useState<string>("")
	const [pageSize, setPageSize] = useState<number>(SIZE)
	const [formattedUsers, setFormattedUsers] = useState<any>([])
	const [exportUser, setExportUser] = useState<number>(0)
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const [pageNumber, setPageNumber] = useState<number>(PAGE)
	const [sortModel, setSortModel] = useState<GridSortModel>()
	const [sorting, setSorting] = useState<{ field: string; type?: string }>()

	const columns: GridColumns = [
		{
			field: "activated",
			headerName: "Activé ",
			type: "boolean",
			headerClassName: "info-cell",
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
			flex: 0.1,
		},

		{
			field: "email",
			headerName: "Email",
			type: "string",
			flex: 0.2,
		},
		{
			field: "internStatus",
			headerName: "Statut",
			type: "string",
			flex: 0.1,
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
						icon={<FileDownload color="primary" />}
						label="Exporter"
						onClick={() => setExportUser(Number(user.id))}
						title="Exporter"
					/>,
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

	useEffect(() => {
		if (sortModel && sortModel.length > 0) {
			setSorting({
				field: sortModel[0].field,
				type: sortModel[0].sort?.toUpperCase(),
			})
		} else {
			setSorting(undefined)
		}
	}, [sortModel])

	const users = useQuery(
		["users", pageNumber, search, pageSize, sorting],
		() =>
			userService
				.getAllPaginated({
					page: pageNumber,
					size: pageSize,
					name: search !== "" ? search : null,
					sortField: sorting?.field,
					sortType: sorting?.type,
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

	useQuery(["rgpd-user", exportUser], () => userService.getById(exportUser), {
		enabled: exportUser > 0,
		onSuccess: (data: User) => {
			exportItem(data, `export_${data.email}_${Date.now()}`)
		},
	})

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

	return {
		search,
		onChange,
		formattedUsers,
		columns,
		users,
		setPageSize,
		sortModel,
		setSortModel,
		onPageChange,
	}
}

export default useUserAdminPage
