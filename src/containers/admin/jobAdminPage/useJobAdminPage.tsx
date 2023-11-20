import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"

import DeleteIcon from "@mui/icons-material/Delete"
import {
	frFR,
	GridActionsCellItem,
	GridColumns,
	GridRowId,
	GridSortModel,
} from "@mui/x-data-grid"

import Swal from "sweetalert2"
import jobService from "../../../api/services/jobService"
import Job from "../../../api/models/job"
import { PAGE, SIZE } from "./Constants"

function useJobAdminPage() {
	const locale = frFR.components.MuiDataGrid.defaultProps.localeText
	const [search, setSearch] = useState<string>("")
	const [pageSize, setPageSize] = useState<number>(SIZE)
	const [pageNumber, setPageNumber] = useState<number>(PAGE)
	const [sortModel, setSortModel] = useState<GridSortModel>([])
	const [orderId, setOrderId] = useState<string>("")
	const [orderName, setOrderName] = useState<string>("")
	const [orderUserCount, setOrderUserCount] = useState<string>("")
	const [orderCompanyCount, setOrderCompanyCount] = useState<string>("")

	const columns: GridColumns = [
		{
			field: "id",
			headerName: "Numéro",
			type: "string",
			editable: false,
			flex: 0.1,
		},
		{
			field: "name",
			headerName: "Nom ",
			type: "string",
			editable: true,
			flex: 0.2,
			headerClassName: "info-cell",
		},
		{
			field: "companyCount",
			headerName: "Entreprise(s) qui recherche(nt)",
			type: "number",
			editable: false,
			flex: 0.2,
		},
		{
			field: "userCount",
			headerName: "Utilisateur(s) qui recherche(nt)",
			type: "number",
			editable: false,
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
						key={`job-action-${job.id}`}
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
		[
			"jobs",
			pageNumber,
			search,
			pageSize,
			orderId,
			orderName,
			orderCompanyCount,
			orderUserCount,
		],
		() =>
			jobService.getAllPaginated({
				page: pageNumber,
				size: pageSize,
				query: search !== "" ? search : null,
				orderCompanyCount,
				orderUserCount,
				orderName,
				orderId,
			}),
		{
			keepPreviousData: true,
		}
	)

	useEffect(() => {
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
				case "userCount":
					setOrderUserCount(model.sort ?? "")
					break
				case "companyCount":
					setOrderCompanyCount(model.sort ?? "")
					break
			}
		}
	}, [sortModel])

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
			jobs.refetch()
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

	return {
		locale,
		search,
		onChange,
		addJob,
		columns,
		jobs,
		setPageSize,
		onPageChange,
		handleCellEditCommit,
		sortModel,
		setSortModel,
	}
}

export default useJobAdminPage
