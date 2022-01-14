import { useRef } from "react"
import { useInfiniteQuery, useQuery } from "react-query"

import activityService from "../../apis/services/activityService"
import companyService from "../../apis/services/companyService"
import CustomSelect from "../../components/inputs/customSelect"
import OverlaySpinner from "../../components/spinners/overlaySpinner"
import CompanyTile from "./companyTile"
import { PAGE, SIZE } from "./constants"

function CompanyPage() {
	const canFetch = useRef(true)

	const companies = useInfiniteQuery(
		"companies",
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

	const activities = useQuery("activities", () =>
		activityService
			.getWithFilters()
			.then(res => res.map(r => ({ value: r.id, label: r.name })))
	)

	function handleScroll(e: any) {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
		if (bottom && canFetch.current && companies.hasNextPage) {
			canFetch.current = false
			companies.fetchNextPage()
			// to avoid fetching to quickly
			setTimeout(() => (canFetch.current = true), 200)
		}
	}

	return (
		<>
			<CustomSelect
				className="company-select--activities"
				isMulti
				placeholder="Filtre par activité"
				options={activities.data}
			/>
			<section onScroll={handleScroll} className="company-container">
				{companies.isFetching && <OverlaySpinner />}

				{companies?.data?.pages?.map(page =>
					page?.content?.map(c => (
						<CompanyTile key={c.id} company={c} />
					))
				)}
			</section>
		</>
	)
}

export default CompanyPage
