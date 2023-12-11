import { useEffect, useState } from "react"
import {
	GridActionsCellItem,
	GridColumns,
	GridRowId,
	GridSortModel,
} from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Edit, Visibility } from "@mui/icons-material"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import DeleteIcon from "@mui/icons-material/Delete"
import Swal from "sweetalert2"
import companyService from "../../../api/services/companyService"
import Activity from "../../../api/models/activity"
import { PAGE, SIZE } from "./constant"
import Company from "../../../api/models/company"

function useCompanyAdminPage() {
	const [search, setSearch] = useState<string>("")
	const [pageSize, setPageSize] = useState<number>(SIZE)
	const [formattedCompanies, setFormattedCompanies] = useState<any>([])
	const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false)
	const [companyIdPreview, setCompanyIdPreview] = useState<GridRowId>(0)

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
			flex: 0.1,
			headerClassName: "info-cell",
		},
		{
			field: "name",
			headerName: "Nom",
			type: "string",

			flex: 0.2,
		},
		{
			field: "searchedActivities",
			headerName: "Domaines recherchés",
			sortable: false,
			type: "string",
			flex: 0.2,
		},

		{
			field: "city",
			headerName: "Ville",
			type: "string",
			flex: 0.2,
			valueGetter: params => params.row?.city?.name,
		},

		{
			field: "type",
			headerName: "Type",
			type: "string",
			flex: 0.2,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			cellClassName: "actions",
			flex: 0.2,
			// eslint-disable-next-line arrow-body-style
			getActions: company => {
				return [
					<GridActionsCellItem
						icon={<Visibility color="info" />}
						label="Prévisualiser"
						title="Prévisualiser"
						onClick={() => onOpenPreviewModal(company.id)}
					/>,
					<GridActionsCellItem
						icon={<Edit color="secondary" />}
						label="Modifier"
						title="Modifier"
						onClick={() =>
							navigate(`/company-details/${company.id}`)
						}
					/>,
					company.row.activated ? (
						<GridActionsCellItem
							icon={<RadioButtonCheckedIcon color="warning" />}
							label="Désactiver"
							title="Désactiver"
							onClick={() => handleDeactivateClick(company.id)}
						/>
					) : (
						<GridActionsCellItem
							icon={
								<RadioButtonUncheckedIcon className="uncheck" />
							}
							label="Activer"
							title="Activer"
							onClick={() =>
								postActive.mutate({
									companyId: +company.id,
									activated: true,
								})
							}
						/>
					),

					<GridActionsCellItem
						title="Supprimer"
						icon={<DeleteIcon color="error" />}
						label="Supprimer"
						onClick={() => handleDeleteClick(company.id)}
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

	const onOpenPreviewModal = (companyId: GridRowId) => {
		setOpenPreviewModal(true)
		setCompanyIdPreview(companyId)
	}

	const companies = useQuery(
		["companies", pageNumber, search, pageSize, sorting],
		() =>
			companyService
				.getAllSimplePaginated({
					page: pageNumber,
					size: pageSize,
					name: search !== "" ? search : null,
					sortField: sorting?.field,
					sortType: sorting?.type,
				})
				.then(res => {
					res.content.forEach((c: any) => {
						let activities = ""
						c.searchedActivities?.forEach(
							(element: Activity, index: number) => {
								index !== c.searchedActivities.length - 1
									? (activities += `${element.name}, `)
									: (activities += element.name)
							}
						)
						c.searchedActivities = activities
					})
					setFormattedCompanies(res.content)
					return res
				}),
		{
			keepPreviousData: true,
		}
	)
	const postActive = useMutation(
		({ activated, companyId }: any) =>
			companyService.active(activated, companyId),
		{
			onSuccess: (data, variables) => {
				let text: string = "L'entreprise a été activée !"
				let icon: any = "success"
				if (variables.activated === false) {
					text = "L'entreprise a été désactivée !"
					icon = "warning"
				}
				Swal.fire({
					position: "bottom-end",
					title: "",
					text,
					icon,
					timer: 1500,
				})

				const lOld = [...formattedCompanies]

				lOld.forEach((c: Company) => {
					if (c.id === variables.companyId) {
						c.activated = variables.activated
					}
				})
				setFormattedCompanies(lOld)
				queryClient.setQueryData(
					["companies", pageNumber, search, pageSize],
					(old: any) => {
						const oldOne = Object.assign(old)
						oldOne.content = lOld
						return oldOne
					}
				)
			},
		}
	)

	const deleteCompany = useMutation(
		(id: string) => companyService.delete(id),
		{
			onSuccess: () => {
				companies.refetch()
				Swal.fire({
					title: "Cette entreprise a bien été supprimé.",
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

	function handleDeactivateClick(id: GridRowId) {
		Swal.fire({
			title: "Êtes-vous sûr de la désactiver?",
			text: "Cette entreprise n'apparaitra plus dans la liste de recherche !",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Oui, désactiver !",
			cancelButtonText: "Annuler",
		}).then(result => {
			if (result.isConfirmed) {
				postActive.mutate({
					companyId: +id,
					activated: false,
				})
			}
		})
	}

	const handleDeleteClick = async (id: GridRowId) => {
		Swal.fire({
			title: "Êtes-vous sûr?",
			text: "Cette entreprise n'apparaitra plus !",
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

	const onPageSizeChange = (size: number) => {
		setPageNumber(PAGE)
		setPageSize(size)
	}

	return {
		search,
		onChange,
		formattedCompanies,
		columns,
		companies,
		onPageSizeChange,
		sortModel,
		setSortModel,
		onPageChange,
		openPreviewModal,
		setOpenPreviewModal,
		companyIdPreview,
	}
}

export default useCompanyAdminPage
