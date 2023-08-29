import { SetStateAction, useState } from "react"
import { useQuery } from "react-query"
import userService from "../../../api/services/userService"
import { PAGE_SIZE_DEFAULT } from "./statisticsIndividualPage.constant"

function useStatisticsIndividualPage(initialPage = 0, initialPageSize = 20) {
	const [searchName, setSearchName] = useState<string>("")
	const [searchFirstName, setSearchFirstName] = useState<string>("")
	const [searchPostalCode, setSearchPostalCode] = useState<any>("")
	const [searchStatus, setSearchStatus] = useState<any>("")
	const [currentPage, setCurrentPage] = useState(0)
	const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_DEFAULT)
	const individualStatsQuery = useQuery(
		["user-stats", initialPage, initialPageSize],
		() =>
			userService.getAllPaginated({
				page: initialPage,
				size: initialPageSize,
			})
	)
	const onChangeName = (evt: any) => {
		evt.preventDefault()
		setSearchName(evt.target.value)
	}
	const onChangeFirstName = (evt: any) => {
		evt.preventDefault()
		setSearchFirstName(evt.target.value)
	}
	const onChangePostalCode = (evt: any) => {
		evt.preventDefault()
		setSearchPostalCode(evt.target.value)
	}
	const onChangeStatus = (evt: any) => {
		evt.preventDefault()
		setSearchStatus(evt.target.value)
	}

	let filteredRows: any = individualStatsQuery?.data?.content
	if (searchFirstName) {
		filteredRows = individualStatsQuery?.data?.content.filter(
			(row: { firstName: string }) =>
				row.firstName
					.toLowerCase()
					.includes(searchFirstName.toLowerCase())
		)
	}
	if (searchName) {
		filteredRows = individualStatsQuery?.data?.content.filter(
			(row: { name: string }) =>
				row.name.toLowerCase().includes(searchName.toLowerCase())
		)
	}
	if (searchPostalCode) {
		const postalCodeToNumber = parseInt(searchPostalCode, 10)
		filteredRows = individualStatsQuery?.data?.content.filter(
			(row: { postalCode: number }) =>
				row.postalCode === postalCodeToNumber
		)
	}
	if (searchStatus) {
		filteredRows = individualStatsQuery?.data?.content.filter(
			(row: { internStatus: { name: string } }) =>
				row.internStatus.name
					.toLowerCase()
					.includes(searchStatus.toLowerCase())
		)
	}
	filteredRows = filteredRows?.map(
		(item: { createdDate: string | number | Date }) => ({
			...item,
			createdDate: new Date(item.createdDate),
		})
	)
	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}
	const rows = filteredRows || []
	const loading = individualStatsQuery?.isLoading
	const rowCount = individualStatsQuery?.data?.totalElements || 0
	const pageChange = (newPage: number) => {
		handlePageChange(newPage)
	}
	const pageSizeChange = (newPageSize: SetStateAction<number>) => {
		setPageSize(newPageSize)
		setCurrentPage(0)
	}

	return {
		individualStatsQuery,
		fetchIndividualStats: (
			page: unknown | string,
			pageSize: unknown | string
		) => {
			individualStatsQuery.refetch({
				queryKey: ["user-stats", page, pageSize],
			})
		},
	}
}
export default useStatisticsIndividualPage
