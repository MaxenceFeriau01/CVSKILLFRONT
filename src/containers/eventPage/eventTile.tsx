import dayjs from "dayjs"
import localeFr from "dayjs/locale/fr"
import Event from "../../api/models/event"
import imageUpload from "../../resources/images/image-upload.svg"
import EventModal from "./eventModal"
import useEventTile from "./hooks/useEventTile"

interface EventTileProps {
	event: Event
}

dayjs.locale(localeFr)

function EventTile({ event }: EventTileProps) {
	const { isOpen, handleClick, handleClose, handleInterested } =
		useEventTile()

	return (
		<>
			<article className="event-tile" onClick={handleClick}>
				<div className="event-tile__image">
					{event.image ? (
						<img alt="logo" src={event.image} width="300" />
					) : (
						<img src={imageUpload} alt="Default" />
					)}
				</div>
				<h4>
					{event.name} ({event.type})
				</h4>
				<div className="overflow-hidden w-5/6">
					{dayjs(event.startedAt).format("DD MMMM YYYY [à] HH:mm")} -{" "}
					{dayjs(event.endedAt).format("DD MMMM YYYY [à] HH:mm")}
				</div>
				<span className="event-tile__type">
					<b>{event.eventLocation.name}</b>
				</span>
			</article>
			<EventModal
				event={event}
				isOpen={isOpen}
				closeModal={handleClose}
				handleInterested={() => handleInterested(event)}
			/>
		</>
	)
}

export default EventTile
