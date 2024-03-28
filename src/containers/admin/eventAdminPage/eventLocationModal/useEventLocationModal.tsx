import { useMutation, useQuery } from "react-query"
import { useEffect, useState } from "react"
import {
	GridActionsCellItem,
	GridColumns,
	GridSortModel,
} from "@mui/x-data-grid"
import { Delete, Edit } from "@mui/icons-material"
import Swal from "sweetalert2"
import Page from "../../../../api/models/utils/Page"
import EventLocation from "../../../../api/models/eventLocation"
import eventLocationService from "../../../../api/services/eventLocationService"
import { PAGE, SIZE } from "./constants"

function useEventLocationModal() {
	const [query, setQuery] = useState<string>()
	const [pageNumber, setPageNumber] = useState<number>(PAGE)
	const [sizeNumber, setSizeNumber] = useState<number>(SIZE)

	const [sortModel, setSortModel] = useState<GridSortModel>()
	const [sorting, setSorting] = useState<{ field: string; type?: string }>()

	const [location, setLocation] = useState<EventLocation>()
	const [editionForm, setEditionForm] = useState<boolean>(false)

	const locations = useQuery<Page<EventLocation>>(
		["locations", query, pageNumber, sizeNumber, sorting],
		() =>
			eventLocationService.getAllPaginatedLocations({
				page: pageNumber,
				size: sizeNumber,
				sortField: sorting?.field,
				sortType: sorting?.type,
				query: query || undefined,
			}),
		{
			keepPreviousData: true,
		}
	)

	const deleteEvent = useMutation(
		(id: number) => eventLocationService.delete(id),
		{
			onSuccess: () => {
				locations.refetch()
				Swal.fire({
					title: "Cet événement a bien été supprimée",
					icon: "success",
					position: "bottom-end",
					showConfirmButton: false,
					timer: 1500,
				})
			},
			onError: () => {
				Swal.fire({
					title: "Erreur lors de la suppression",
					icon: "error",
					position: "bottom-end",
					showConfirmButton: false,
					timer: 1500,
				})
			},
		}
	)

	const handleDelete = (id: any) => {
		Swal.fire({
			title: "Êtes-vous sûr?",
			text: "Ce lieu n'apparaitra plus !",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Oui, supprimer !",
			cancelButtonText: "Annuler",
		}).then(result => {
			if (result.isConfirmed) {
				deleteEvent.mutate(Number(id))
			}
		})
	}

	const columns: GridColumns = [
		{
			field: "id",
			headerName: "ID",
			type: "number",
			flex: 0.1,
		},
		{
			field: "name",
			headerName: "Intitulé",
			type: "string",
			flex: 0.2,
		},
		{
			field: "address",
			headerName: "Adresse postale",
			type: "string",
			flex: 0.3,
		},
		{
			field: "postalCode",
			headerName: "Code postal",
			type: "number",
			flex: 0.1,
		},
		{
			field: "city",
			headerName: "Ville",
			type: "string",
			flex: 0.2,
		},
		{
			field: "actions",
			headerName: "Actions",
			type: "actions",
			cellClassName: "actions",
			flex: 0.1,
			getActions: el => [
				<GridActionsCellItem
					icon={<Edit color="secondary" />}
					label="Modifier"
					title="Modifier"
					onClick={() => {
						setLocation({
							id: el.row.id,
							name: el.row.name,
							address: el.row.address,
							postalCode: el.row.postalCode,
							city: el.row.city,
						})
						openEditionForm()
					}}
				/>,
				<GridActionsCellItem
					title="Supprimer"
					icon={<Delete color="error" />}
					label="Supprimer"
					onClick={() => handleDelete(el.id)}
				/>,
			],
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

	const onChange = (evt: any) => {
		evt.preventDefault()
		setQuery(evt.target.value)
	}

	const onPageChange = (page: number) => {
		if (page > pageNumber) {
			if (!locations.isPreviousData) {
				setPageNumber(old => old + 1)
			}
		} else if (page < pageNumber) {
			setPageNumber(old => Math.max(old - 1, 0))
		}
	}

	const onPageSizeChange = (size: number) => {
		setPageNumber(PAGE)
		setSizeNumber(size)
	}

	const openEditionForm = () => {
		setEditionForm(true)
	}

	const closeEditionForm = () => {
		setLocation(undefined)
		setEditionForm(false)
		locations.refetch()
	}

	return {
		columns,
		locations,
		query,
		pageNumber,
		sizeNumber,
		onChange,
		onPageChange,
		onPageSizeChange,
		sortModel,
		setSortModel,
		location,
		editionForm,
		openEditionForm,
		closeEditionForm,
	}
}

export default useEventLocationModal
