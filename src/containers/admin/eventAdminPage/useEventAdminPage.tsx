import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import {
	GridActionsCellItem,
	GridColumns,
	GridSortModel,
} from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import { Edit } from "@mui/icons-material"
import dayjs from "dayjs"
import Swal from "sweetalert2"
import { PAGE, SIZE } from "./constant"
import eventService from "../../../api/services/eventService"

function useEventAdminPage() {
	const [query, setQuery] = useState<string>("")
	const [page, setPage] = useState<number>(PAGE)
	const [size, setSize] = useState<number>(SIZE)

	const navigate = useNavigate()

	const [sortModel, setSortModel] = useState<GridSortModel>()
	const [sorting, setSorting] = useState<{ field: string; type?: string }>()

	const columns: GridColumns = [
		{
			field: "active",
			headerName: "Etat",
			type: "boolean",
			headerClassName: "info-cell",
			flex: 0.1,
		},
		{
			field: "name",
			headerName: "Intitulé",
			type: "string",
			flex: 0.2,
		},
		{
			field: "type",
			headerName: "Type",
			type: "string",
			flex: 0.2,
		},
		{
			field: "startedAt",
			headerName: "Date de début",
			type: "datetime",
			flex: 0.2,
			valueFormatter: ({ value }) =>
				dayjs(String(value)).format("DD/MM/YYYY HH:mm"),
		},
		{
			field: "endedAt",
			headerName: "Date de fin",
			type: "datetime",
			flex: 0.2,
			valueFormatter: ({ value }) =>
				dayjs(String(value)).format("DD/MM/YYYY HH:mm"),
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			cellClassName: "actions",
			flex: 0.2,
			// eslint-disable-next-line arrow-body-style
			getActions: event => {
				return [
					<GridActionsCellItem
						icon={<Edit color="secondary" />}
						label="Modifier"
						title="Modifier"
						onClick={() => navigate(`/admin/events/${event.id}`)}
					/>,
					<GridActionsCellItem
						title="Supprimer"
						icon={<DeleteIcon color="error" />}
						label="Supprimer"
						onClick={() => handleDelete(event.id)}
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

	const events = useQuery(
		["events", page, size, query, sorting],
		() =>
			eventService
				.getAllPaginatedEvents({
					page,
					size,
					query: query !== "" ? query : null,
					sortField: sorting?.field,
					sortType: sorting?.type,
				})
				.then(res => res),
		{
			keepPreviousData: true,
		}
	)

	const handleDelete = (id: any) => {
		Swal.fire({
			title: "Êtes-vous sûr?",
			text: "Cet événement n'apparaitra plus !",
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

	const deleteEvent = useMutation((id: number) => eventService.delete(id), {
		onSuccess: () => {
			events.refetch()
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
	})

	const onChange = (evt: any) => {
		evt.preventDefault()
		setQuery(evt.target.value)
	}

	const onPageChange = (pageNumber: number) => {
		if (pageNumber > page) {
			if (!events.isPreviousData) {
				setPage(old => old + 1)
			}
		} else if (pageNumber < page) {
			setPage(old => Math.max(old - 1, 0))
		}
	}

	const onPageSizeChange = (pageSize: number) => {
		setPage(PAGE)
		setSize(pageSize)
	}

	return {
		columns,
		events,
		query,
		onChange,
		page,
		onPageChange,
		size,
		onPageSizeChange,
		navigate,
		sortModel,
		setSortModel,
	}
}

export default useEventAdminPage
