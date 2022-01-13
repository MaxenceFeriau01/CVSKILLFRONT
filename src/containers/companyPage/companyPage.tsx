import { useRef } from "react"
import { useInfiniteQuery, useQuery } from "react-query"
import Select from "react-select"

import activityService from "../../apis/services/activityService"
import companyService from "../../apis/services/companyService"
import OverlaySpinner from "../../components/spinners/overlaySpinner"
import CompanyTile from "./companyTile"
import { PAGE, SIZE } from "./constants"

function CompanyPage() {
	const canFetch = useRef(true)

	const companiesQuery = useInfiniteQuery(
		"companiesQuery",
		({ pageParam = PAGE }) =>
			companyService.getPaginationWithFilters({
				page: pageParam,
				size: SIZE,
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

	const activitiesQuery = useQuery("activitiesQuery", () =>
		activityService
			.getWithFilters()
			.then(res => res.map(r => ({ value: r.id, label: r.name })))
	)

	function handleScroll(e: any) {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
		if (bottom && canFetch.current && companiesQuery.hasNextPage) {
			canFetch.current = false
			companiesQuery.fetchNextPage()
			// to avoid fetching to quickly
			setTimeout(() => (canFetch.current = true), 200)
		}
	}

	return (
		<>
			<Select
				className="company-select--activities"
				isMulti
				placeholder="Filtre par activité"
				options={activitiesQuery.data}
			/>
			<section onScroll={handleScroll} className="company-container">
				{companiesQuery.isFetching && <OverlaySpinner />}

				{companiesQuery?.data?.pages?.map(page =>
					page?.content?.map(c => (
						<CompanyTile key={c.id} company={c} />
					))
				)}
			</section>
		</>
	)
}

export default CompanyPage
