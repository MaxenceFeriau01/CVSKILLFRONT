import React, { useContext, useEffect, useRef, useState } from "react"
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query"
import Activity from "../../../api/models/activity"
import Company from "../../../api/models/company"
import Job from "../../../api/models/job"
import ReactSelectOption from "../../../api/models/reactSelectOption"
import companyService from "../../../api/services/companyService"
import UserContext from "../../../contexts/user"
import Role from "../../../enums/Role"
import { hasRoles } from "../../../utils/rightsUtil"
import { PAGE, SIZE } from "../constants"

interface useCompaniesInfiniteQueryType {
	companiesInfiniteQuery: UseInfiniteQueryResult<any>
	handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>): void
	setStatusFilter(option: ReactSelectOption): void
	setActivityFilter(options: ReactSelectOption[]): void
	setJobsFilter(options: ReactSelectOption[]): void
	selectedStatusFilter: number | string | null
	selectedActivities: number[]
	selectedJobs: number[]
}

function useCompaniesInfiniteQuery(setSelectedCompany: {
	(company: Company | null): void
}): useCompaniesInfiniteQueryType {
	const { user, userRoles } = useContext(UserContext)

	const [selectedActivities, setSelectedActivitiesFilter] = useState<
		number[]
	>(
		isNotAdmin()
			? user.activities?.map((activity: Activity) => activity?.id)
			: []
	)
	const [selectedJobs, setSelectedJobsFilter] = useState<number[]>(
		isNotAdmin() ? user.jobs?.map((job: Job) => job?.id) : []
	)
	const [selectedStatusFilter, setSelectedStatusFilter] = useState<
		number | null | string
	>(isNotAdmin() ? user?.internStatus?.id : null)

	useEffect(() => {
		if (isNotAdmin()) {
			setSelectedStatusFilter(user.internStatus?.id)
			setSelectedActivitiesFilter(
				user.activities?.map((activity: Activity) => activity?.id)
			)
			setSelectedJobsFilter(user.jobs?.map((job: Job) => job?.id))
		}

		return () => {
			setSelectedStatusFilter(null)
			setSelectedJobsFilter([])
			setSelectedActivitiesFilter([])
		}
	}, [user, userRoles])

	const canFetch = useRef(true)
	const companiesInfiniteQuery = useInfiniteQuery(
		["companies", selectedActivities, selectedStatusFilter, selectedJobs],
		({ pageParam = PAGE }) =>
			companyService.getAllPaginated({
				page: pageParam,
				size: SIZE,
				activities:
					selectedActivities?.length > 0
						? selectedActivities.join(",")
						: null,
				jobs: selectedJobs?.length > 0 ? selectedJobs.join(",") : null,
				statusId: selectedStatusFilter,
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

	function isNotAdmin() {
		return (
			user && userRoles.length > 0 && !hasRoles([Role.ADMIN], userRoles)
		)
	}

	function handleScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
		const bottom =
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			e.currentTarget.clientHeight
		if (bottom && canFetch.current && companiesInfiniteQuery.hasNextPage) {
			canFetch.current = false
			companiesInfiniteQuery.fetchNextPage()
			// to avoid fetching to quickly
			setTimeout(() => (canFetch.current = true), 200)
		}
	}

	function setActivityFilter(evt: ReactSelectOption[]) {
		setSelectedCompany(null)
		setSelectedActivitiesFilter(
			evt.length > 0 ? evt.map(x => +x.value) : []
		)
	}

	function setStatusFilter(option: ReactSelectOption) {
		setSelectedCompany(null)
		setSelectedStatusFilter(option === null ? null : option.value)
	}

	function setJobsFilter(evt: ReactSelectOption[]) {
		setSelectedCompany(null)
		setSelectedJobsFilter(evt.length > 0 ? evt.map(x => +x.value) : [])
	}

	return {
		companiesInfiniteQuery,
		handleScroll,
		setActivityFilter,
		setStatusFilter,
		setJobsFilter,
		selectedStatusFilter,
		selectedActivities,
		selectedJobs,
	}
}

export default useCompaniesInfiniteQuery
