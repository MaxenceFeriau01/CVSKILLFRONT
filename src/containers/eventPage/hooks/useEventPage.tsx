import React, { useRef } from "react"
import { useInfiniteQuery } from "react-query"
import { PAGE, SIZE } from "../constants"
import eventService from "../../../api/services/eventService"

function useEventPage() {
	const canFetch = useRef(true)
	const events = useInfiniteQuery(
		["events"],
		({ pageParam = PAGE }) =>
			eventService.getAllPaginatedEvents({
				onlyCurrentEvents: true,
				page: pageParam,
				active: true,
				size: SIZE,
				sortField: "endedAt",
				sortType: "asc",
			}),
		{
			getNextPageParam: data => {
				if (data.number < data.totalPages - 1) {
					return data.number + 1
				}
				return false
			},
		}
	)

	function handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
		const bottom =
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			e.currentTarget.clientHeight
		if (bottom && canFetch.current && events.hasNextPage) {
			canFetch.current = false
			events.fetchNextPage()
			// to avoid fetching to quickly
			setTimeout(() => (canFetch.current = true), 200)
		}
	}

	return {
		events,
		handleScroll,
	}
}

export default useEventPage
