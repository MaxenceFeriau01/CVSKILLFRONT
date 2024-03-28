import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import dayjs from "dayjs"
import eventService from "../../../../api/services/eventService"
import Event from "../../../../api/models/event"
import { getFileBase64 } from "../../../../utils/filesUtil"
import EventLocation from "../../../../api/models/eventLocation"
import eventLocationService from "../../../../api/services/eventLocationService"
import { PAGE, SIZE, TYPE_OPTIONS } from "../constant"
import Page from "../../../../api/models/utils/Page"
import ReactSelectOption from "../../../../api/models/reactSelectOption"

interface UseEventAdminFormProps {
	id: any
}

function useEventAdminForm({ id }: UseEventAdminFormProps) {
	const [options, setOptions] = useState<ReactSelectOption[]>([])
	const [placeModal, setPlaceModal] = useState<boolean>(false)
	const [otherField, setOtherField] = useState<boolean>(false)
	const [query, setQuery] = useState<string>()

	const navigate = useNavigate()
	const form = useForm<Event>({
		mode: "onChange",
		defaultValues: {
			id: undefined,
			name: "",
			type: "",
			image: undefined,
			file: undefined,
			eventLocation: {},
			active: true,
			description: "",
			startedAt: dayjs().format("YYYY-MM-DD [00:00]"),
			endedAt: dayjs().format("YYYY-MM-DD [00:00]"),
			location: {},
			selectedType: undefined,
		},
	})

	const event = useQuery<Event>(
		["event"],
		() =>
			eventService.getById(id).then((res: Event) => {
				form.setValue("id", res.id)
				form.setValue("name", res.name)
				form.setValue("type", res.type)
				if (
					[
						TYPE_OPTIONS[0].value,
						TYPE_OPTIONS[1].value,
						TYPE_OPTIONS[2].value,
					].includes(res.type)
				) {
					form.setValue("selectedType", res.type)
				} else {
					form.setValue("selectedType", TYPE_OPTIONS[3].value || "")
					setOtherField(true)
				}
				form.setValue("active", res.active)
				form.setValue("description", res.description)
				form.setValue("image", res.image)
				form.setValue("startedAt", res.startedAt)
				form.setValue("endedAt", res.endedAt)
				form.setValue("eventLocation", res.eventLocation)
				form.setValue(
					"location",
					new ReactSelectOption(
						res.eventLocation.id || 0,
						res.eventLocation.name
					)
				)
				return res
			}),
		{
			enabled: id !== undefined,
		}
	)

	const locations = useQuery(
		["locations", query],
		() =>
			eventLocationService
				.getAllPaginatedLocations({
					page: PAGE,
					size: SIZE,
					query: query || undefined,
				})
				.then((l: Page<EventLocation>) => {
					setOptions(
						l.content.map(
							el => new ReactSelectOption(el.id || 0, el.name)
						)
					)
					return l.content
				}),
		{
			keepPreviousData: false,
		}
	)

	const saveEvent = useMutation(
		// eslint-disable-next-line no-shadow
		(event: any) => {
			if (id !== undefined) {
				return eventService.put(event, Number(id))
			}
			return eventService.post(event)
		},
		{
			onSuccess: () => {
				Swal.fire({
					title: "Cet événement a bien été sauvegardée",
					icon: "success",
					showConfirmButton: false,
					timer: 1500,
				})
				navigate("/admin/events")
			},
			onError: () => {
				Swal.fire({
					title: "Erreur lors de la sauvegarde",
					icon: "error",
					showConfirmButton: false,
					timer: 1500,
				})
			},
		}
	)

	const handleSave = () => {
		saveEvent.mutate({
			...form.getValues(),
		})
	}

	const onUploadImage = (evt: any) => {
		if (evt.target.files && evt.target.files[0]) {
			getFileBase64(evt.target.files[0], form).then(() => {
				form.setValue("file", undefined)
			})
		}
	}

	const onSelectType = (type: string) => {
		if (type !== TYPE_OPTIONS[3].value) {
			form.setValue("type", type)
			setOtherField(false)
		} else {
			form.setValue("type", "")
			setOtherField(true)
		}
	}

	const onChangeLocation = (val: ReactSelectOption) => {
		const location = locations?.data?.find(l => l.id === val.value)
		if (location) {
			form.setValue("eventLocation", location)
		}
	}

	const openPlaceModal = () => {
		setPlaceModal(true)
	}

	const closePlaceModal = () => {
		setPlaceModal(false)
		locations.refetch()
	}

	return {
		event,
		form,
		setQuery,
		handleSave,
		onUploadImage,
		onChangeLocation,
		onSelectType,
		options,
		otherField,
		placeModal,
		openPlaceModal,
		closePlaceModal,
	}
}

export default useEventAdminForm
