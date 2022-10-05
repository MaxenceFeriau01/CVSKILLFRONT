import React, { useContext, useEffect, useRef, useState } from "react"
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query"
import Company from "../../../api/models/company"
import ReactSelectOption from "../../../api/models/reactSelectOption"
import companyService from "../../../api/services/companyService"
import userService from "../../../api/services/userService"
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
}

function useCompaniesInfiniteQuery(setSelectedCompany: {
	(company: Company | null): void
}): useCompaniesInfiniteQueryType {
	const { user } = useContext(UserContext)

	const [activities, setActivities] = useState<number[] | null | string[]>(
		null
	)
	const [selectedStatusFilter, setSelectedStatusFilter] = useState<
		number | null | string
	>(null)

	useEffect(() => {
		if (
			user &&
			userService.getRoles().length > 0 &&
			!hasRoles([Role.ADMIN], userService.getRoles())
		) {
			setSelectedStatusFilter(user.internStatus.id)
		}
	}, [user, userService.getRoles()])

	const [jobs, setJobs] = useState<number[] | null | string[]>(null)
	const canFetch = useRef(true)
	const companiesInfiniteQuery = useInfiniteQuery(
		["companies", activities, selectedStatusFilter, jobs],
		({ pageParam = PAGE }) =>
			companyService.getAllPaginated({
				page: pageParam,
				size: SIZE,
				activities: activities?.join(","),
				jobs: jobs?.join(","),
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
		setActivities(evt.length > 0 ? evt.map(x => x.value.toString()) : null)
	}

	function setStatusFilter(option: ReactSelectOption) {
		setSelectedCompany(null)
		setSelectedStatusFilter(option === null ? null : option.value)
	}

	function setJobsFilter(evt: ReactSelectOption[]) {
		setSelectedCompany(null)
		setJobs(evt.length > 0 ? evt.map(x => x.value.toString()) : null)
	}

	return {
		companiesInfiniteQuery,
		handleScroll,
		setActivityFilter,
		setStatusFilter,
		setJobsFilter,
		selectedStatusFilter,
	}
}

export default useCompaniesInfiniteQuery
