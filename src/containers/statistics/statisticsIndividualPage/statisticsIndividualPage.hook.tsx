import { useEffect, useState } from "react"
import { GridSortModel } from "@mui/x-data-grid"
import { useQuery } from "react-query"
import dayjs from "dayjs"
import {
	PAGE_NUMBER_DEFAULT,
	PAGE_SIZE_DEFAULT,
	TABLE_COLUMNS,
} from "./statisticsIndividualPage.constant"
import userService from "../../../api/services/userService"
import { exportExcel } from "../../../utils/exportUtil"

function useStatisticsIndividualPage() {
	const [formattedUsers, setFormattedUsers] = useState<any>([])

	const [excel, setExcel] = useState<boolean>(false)
	const [search, setSearch] = useState<string>("")

	const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_DEFAULT)
	const [pageNumber, setPageNumber] = useState<number>(PAGE_NUMBER_DEFAULT)

	const [sortModel, setSortModel] = useState<GridSortModel>()
	const [sorting, setSorting] = useState<{ field: string; type?: string }>()

	const columns = [...TABLE_COLUMNS]

	useEffect(() => {
		if (sortModel && sortModel.length > 0) {
			setSorting({
				field: sortModel[0].field,
				type: sortModel[0].sort?.toUpperCase(),
			})
		} else {
			setSorting(undefined)
		}
	}, [sortModel])

	const users = useQuery(
		["users", pageNumber, pageSize, search, sorting],
		() =>
			getAllUsers().then(data => {
				data.content.forEach((c: any) => {
					const duration = dayjs(
						dayjs(c?.internshipEndDate).diff(c?.internshipStartDate)
					).month()
					c.applyingNumbers = c?.appliedCompanies?.length
					c.internStatus = c?.internStatus?.name
					c.internshipDuration =
						duration >= 2 && duration <= 6 ? duration : null
				})
				setFormattedUsers(data.content)
				return data
			}),
		{
			retry: false,
			keepPreviousData: false,
		}
	)

	useQuery(["export-users", excel], () => getAllUsers(true), {
		enabled: excel,
		onSuccess: data => {
			exportExcel(
				data.content,
				`export_users_stats_${dayjs().format("YYYY-MM-DD-HH-mm")}`
			)
			setExcel(false)
		},
	})

	const getAllUsers = (exp: boolean = false) =>
		userService.getAllPaginated({
			page: pageNumber,
			size: pageSize,
			query: search !== "" ? search : null,
			export: exp,
			sortField: sorting?.field,
			sortType: sorting?.type,
		})

	const onChange = (evt: any) => {
		evt.preventDefault()
		setSearch(evt.target.value)
	}

	const onPageChange = (page: number) => {
		if (page > pageNumber) {
			if (!users.isPreviousData) {
				setPageNumber(old => old + 1)
			}
		} else if (page < pageNumber) {
			setPageNumber(old => Math.max(old - 1, 0))
		}
	}

	return {
		users,
		columns,
		formattedUsers,
		pageNumber,
		setPageNumber,
		pageSize,
		setPageSize,
		search,
		setSearch,
		excel,
		setExcel,
		sortModel,
		setSortModel,
		sorting,
		setSorting,
		onPageChange,
		onChange,
	}
}

export default useStatisticsIndividualPage
