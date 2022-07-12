import { useContext, useRef, useState } from "react"
import { useInfiniteQuery, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

import Company from "../../api/models/company"

import ReactSelectOption from "../../api/models/reactSelectOption"

import activityService from "../../api/services/activityService"
import companyService from "../../api/services/companyService"
import internStatusService from "../../api/services/internStatusService"
import CustomSelect from "../../components/inputs/customSelect"
import CompanyTile from "./companyTile"
import { PAGE, SIZE } from "./constants"

import UserContext from "../../contexts/user"
import CompanyDetailsView from "./companyDetailsView"

function CompanyPage() {
	const canFetch = useRef(true)
	const [filter, setFilter] = useState<number[] | null | string[]>(null)
	const [status, setStatus] = useState<number | null | string>(null)

	const { user } = useContext(UserContext)
	const navigate = useNavigate()
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

	const companies = useInfiniteQuery(
		["companies", filter, status],
		({ pageParam = PAGE }) =>
			companyService.getAllPaginated({
				page: pageParam,
				size: SIZE,
				activities: filter?.join(","),
				statusId: status,
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
			.getAllWithFilters()
			.then(res => res.map(r => new ReactSelectOption(r.id, r.name)))
	)

	const statuses = useQuery("statuses", () =>
		internStatusService
			.getAllWithFilters()
			.then(res => res.map(r => new ReactSelectOption(r.id, r.name)))
	)

	function selectHandleActivityChange(evt: any[]) {
		setSelectedCompany(null)
		setFilter(evt.length > 0 ? evt.map(x => x.value) : null)
	}

	function selectHandleTraineesChange(option: ReactSelectOption) {
		setSelectedCompany(null)
		setStatus(option === null ? null : option.value)
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

	function onClick(company: Company) {
		if (user && user.token) {
			setSelectedCompany(company)
		} else {
			Swal.fire({
				title: "<strong>Non <u>connecté(e)</u>?</strong>",
				icon: "info",
				html:
					"Vous devez vous <b>connecter</b>, " +
					"pour profiter de l'ensemble des fonctionnalités.",
				showCloseButton: true,
				showDenyButton: true,
				focusConfirm: false,
				confirmButtonText: "Connexion",
				denyButtonText: "Inscription",
				denyButtonColor: "#2daf8e",
			}).then(result => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					navigate("/login")
				} else if (result.isDenied) {
					navigate("/registration")
				}
			})
		}
	}

	return (
		<section className="page company-page">
			{user && user.token ? (
				<header className="company-page-header">
					<CustomSelect
						className="company-select--activities"
						placeholder="Par domaine(s)"
						options={activities.data}
						isMulti
						onChange={(e: any) => selectHandleActivityChange(e)}
						isClearable
						isSearchable
						name="selectActivity"
					/>
					<CustomSelect
						className="company-select--status"
						placeholder="Par status recherché"
						options={statuses.data}
						onChange={(e: any) => selectHandleTraineesChange(e)}
						isClearable
						isSearchable
						name="selectTrainees"
					/>
				</header>
			) : (
				""
			)}

			<section className="content company-container">
				<div
					className={`company-list-content ${
						selectedCompany ? "tablet:w-1/2" : ""
					}`}
					onScroll={handleScroll}
				>
					{companies?.data?.pages?.map(page =>
						page.totalElements > 0 ? (
							page?.content?.map((c: Company) => (
								<CompanyTile
									selectedCompanyId={selectedCompany?.id}
									key={c.id}
									company={c}
									onClick={(company: Company) =>
										onClick(company)
									}
								/>
							))
						) : (
							<p className="text-info text-md mt-10 tablet:text-lg">
								Il n'y a aucunes entreprises correspondant à
								votre recherche
							</p>
						)
					)}
				</div>
				<CompanyDetailsView
					company={selectedCompany}
					onClose={() => setSelectedCompany(null)}
				/>
			</section>
		</section>
	)
}

export default CompanyPage
