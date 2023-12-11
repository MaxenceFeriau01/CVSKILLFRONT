import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import {
	GridActionsCellItem,
	GridColumns,
	GridRowId,
	GridSortModel,
} from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import Swal from "sweetalert2"
import activityService from "../../../api/services/activityService"
import Activity from "../../../api/models/activity"
import { PAGE, SIZE } from "./constant"

function useActivityAdminPage() {
	const [search, setSearch] = useState<string>("")
	const [pageSize, setPageSize] = useState<number>(SIZE)
	const [pageNumber, setPageNumber] = useState<number>(PAGE)
	const [sortModel, setSortModel] = useState<GridSortModel>([])
	const [orderId, setOrderId] = useState<string>("")
	const [orderName, setOrderName] = useState<string>("")
	const [orderCompanyCount, setOrderCompanyCount] = useState<string>("")
	const [orderCompanySearchCount, setOrderCompanySearchCount] =
		useState<string>("")

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
			field: "actions",
			type: "actions",
			headerName: "Action",
			cellClassName: "actions",
			flex: 0.1,
			// eslint-disable-next-line arrow-body-style
			getActions: activity => {
				return [
					<GridActionsCellItem
						key={`deleteActivity${activity.id}`}
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
		return activity.companyCount === 0 && activity.companySearchCount === 0
	}

	const activities = useQuery(
		[
			"activities",
			pageNumber,
			search,
			pageSize,
			orderId,
			orderName,
			orderCompanyCount,
			orderCompanySearchCount,
		],
		() =>
			activityService.getAllPaginated({
				page: pageNumber,
				size: pageSize,
				name: search !== "" ? search : null,
				orderCompanySearchCount: orderCompanySearchCount || null,
				orderCompanyCount: orderCompanyCount || null,
				orderName: orderName || null,
				orderId: orderId || null,
			}),
		{
			keepPreviousData: true,
		}
	)

	useEffect(() => {
		clearSortingData()
		// eslint-disable-next-line no-restricted-syntax
		for (const model of sortModel) {
			// eslint-disable-next-line default-case
			switch (model.field) {
				case "id":
					setOrderId(model.sort ?? "")
					break
				case "name":
					setOrderName(model.sort ?? "")
					break
				case "companyCount":
					setOrderCompanyCount(model.sort ?? "")
					break
				case "companySearchCount":
					setOrderCompanySearchCount(model.sort ?? "")
					break
			}
		}
	}, [sortModel])

	const clearSortingData = () => {
		setOrderId("")
		setOrderName("")
		setOrderCompanyCount("")
		setOrderCompanySearchCount("")
	}

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
			onSuccess: () => {
				activities.refetch()
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

	const onPageSizeChange = (size: number) => {
		setPageNumber(PAGE)
		setPageSize(size)
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

	return {
		search,
		onChange,
		addActivity,
		columns,
		activities,
		onPageSizeChange,
		onPageChange,
		handleCellEditCommit,
		sortModel,
		setSortModel,
	}
}

export default useActivityAdminPage
