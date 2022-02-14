import { Typography } from "@mui/material"
import { useRef, useState } from "react"
import { useInfiniteQuery, useQuery } from "react-query"
import ReactSelectOption from "../../apis/models/reactSelectOption"

import activityService from "../../apis/services/activityService"
import companyService from "../../apis/services/companyService"
import CustomSelect from "../../components/inputs/customSelect"
import OverlaySpinner from "../../components/spinners/overlaySpinner"
import CompanyTile from "./companyTile"
import { PAGE, SIZE } from "./constants"

function CompanyPage() {
	const canFetch = useRef(true)
	const [filter, setFilter] = useState<number | null>(null)

	const companies = useInfiniteQuery(
		["companies", filter],
		({ pageParam = PAGE }) =>
			companyService.getPaginationWithFilters({
				page: pageParam,
				size: SIZE,
				activityId: filter,
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

	function selectHandleChange(option: ReactSelectOption) {
		setFilter(option === null ? null : option.value)
	}

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
		<section className="page company-page">
			<header className="company-page-header">
				<CustomSelect
					className="company-select--activities"
					placeholder="Filtre par activité"
					options={activities.data}
					onChange={(e: any) => selectHandleChange(e)}
					isClearable
					isSearchable
					name="select"
				/>
			</header>

			<div onScroll={handleScroll} className="company-container">
				{companies.isFetching && <OverlaySpinner />}

				{companies?.data?.pages?.map(page =>
					page?.content?.map(c => (
						<CompanyTile key={c.id} company={c} />
					))
				)}
			</div>
		</section>
	)
}

export default CompanyPage
