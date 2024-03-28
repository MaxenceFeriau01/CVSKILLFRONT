import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material"
import dayjs from "dayjs"
import frFR from "dayjs/locale/fr"
import Event from "../../api/models/event"

interface EventModalProps {
	event: Event
	isOpen: boolean
	closeModal: () => any
	handleInterested: () => any
}

dayjs.locale(frFR)

function EventModal({
	event,
	isOpen,
	closeModal,
	handleInterested,
}: EventModalProps) {
	return (
		<Dialog open={isOpen} onClose={closeModal} maxWidth="lg">
			<DialogTitle>
				{event.name} ({event.type})
			</DialogTitle>
			<DialogContent>
				<DialogContentText className="text-center">
					<img
						src={event.image}
						alt={event.name}
						width="250"
						className="mx-auto"
					/>
					<p>{event.description}</p>
					<h4>
						Evévement du{" "}
						{dayjs(event.startedAt).format(
							"DD MMMM YYYY [à] HH:mm"
						)}{" "}
						au{" "}
						{dayjs(event.endedAt).format("DD MMMM YYYY [à] HH:mm")}
					</h4>
					<h5>Lieu : {event.eventLocation.name}</h5>
					<p>
						{event.eventLocation.address}{" "}
						{event.eventLocation.postalCode}{" "}
						{event.eventLocation.city}
					</p>
				</DialogContentText>
			</DialogContent>
			<DialogActions className="mx-auto">
				<Button type="button" onClick={handleInterested}>
					Je suis intéressé !
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EventModal
