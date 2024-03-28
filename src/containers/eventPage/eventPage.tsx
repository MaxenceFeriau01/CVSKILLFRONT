import Event from "../../api/models/event"
import EventTile from "./eventTile"
import useEventPage from "./hooks/useEventPage"

function EventPage() {
	const { events, handleScroll } = useEventPage()

	return (
		<section className="page event-page">
			<header className="event-page-header">
				<h1>Agenda des manifestations</h1>
			</header>
			<section className="content event-container">
				<div className="event-list-content" onScroll={handleScroll}>
					{events?.data?.pages?.map(page =>
						page?.totalElements > 0 ? (
							page?.content?.map((event: Event) => (
								<EventTile event={event} />
							))
						) : (
							<p className="text-info text-md mt-10 tablet:text-lg">
								Il n'y a aucun événement sur le site DKStages.
							</p>
						)
					)}
				</div>
			</section>
		</section>
	)
}

export default EventPage
