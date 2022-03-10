import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useRef, useState, useContext, ChangeEvent } from "react"
import { useInfiniteQuery, useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

import Company from "../../api/models/company"

import ReactSelectOption from "../../api/models/reactSelectOption"

import activityService from "../../api/services/activityService"
import internStatusService from "../../api/services/internStatusService"
import companyService from "../../api/services/companyService"
import CustomSelect from "../../components/inputs/customSelect"
import HasRight from "../../components/rights/hasRight"
import Role from "../../enums/Role"
import CompanyTile from "./companyTile"
import { PAGE, SIZE } from "./constants"

import UserContext from "../../contexts/user"

function CompanyPage() {
	const canFetch = useRef(true)
	const [filter, setFilter] = useState<number[] | null | string[]>(null)
	const [status, setStatus] = useState<number | null | string>(null)
	const [isPaid, setIsPaid] = useState<boolean>(false)

	const { user } = useContext(UserContext)
	const navigate = useNavigate()
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

	const companies = useInfiniteQuery(
		["companies", filter, status, isPaid],
		({ pageParam = PAGE }) =>
			companyService.getAllPaginated({
				page: pageParam,
				size: SIZE,
				activities: filter?.join(","),
				statusId: status,
				isPaidAndLongTermInternship: isPaid === false ? null : isPaid,
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
		setFilter(evt.length > 0 ? evt.map(x => x.value) : null)
	}

	function selectHandleTraineesChange(option: ReactSelectOption) {
		setStatus(option === null ? null : option.value)
	}

	const selectIsPaidAndLongTermInternship = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setIsPaid(event.target.checked)
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
			console.log(company)
			setSelectedCompany(company)
		} else {
			Swal.fire({
				title: "<strong>Non <u>connecté(e)</u>?</strong>",
				icon: "info",
				html:
					"Vous devez vous <b>connecter</b>, " +
					"pour profiter de l'ensemble des fonctionnalités.",
				showCloseButton: true,
				focusConfirm: false,
				confirmButtonText: "Se connecter !",
			}).then(result => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					navigate("/login")
				}
			})
		}
	}

	return (
		<section className="page company-page">
			<header className="company-page-header">
				<CustomSelect
					className="company-select--activities"
					placeholder="Filtre par activité"
					options={activities.data}
					isMulti
					onChange={(e: any) => selectHandleActivityChange(e)}
					isClearable
					isSearchable
					name="selectActivity"
				/>
				<CustomSelect
					className="company-select--activities"
					placeholder="Filtre par stagiaire"
					options={statuses.data}
					onChange={(e: any) => selectHandleTraineesChange(e)}
					isClearable
					isSearchable
					name="selectTrainees"
				/>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={isPaid}
								onChange={selectIsPaidAndLongTermInternship}
								sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
								inputProps={{ "aria-label": "controlled" }}
							/>
						}
						label="Uniquement les stages de longue durée"
						name="selectIsPaidAndLongTermInternship"
					/>
				</FormGroup>
			</header>
			<section className="company-container">
				<div
					onScroll={handleScroll}
					className="w-full h-full overflow-auto"
				>
					<div className="content company-content">
						<HasRight roles={[Role.ADMIN]}>
							<Link
								to="/new-company"
								className="company-tile company-tile--add"
							>
								<span>+</span>
								<b>Créer une entreprise</b>
							</Link>
						</HasRight>
						{companies?.data?.pages?.map(page =>
							page?.content?.map((c: Company) => (
								<CompanyTile
									key={c.id}
									company={c}
									onClick={(company: Company) =>
										onClick(company)
									}
								/>
							))
						)}
					</div>
				</div>
				<div className="company-details-container">
					<div className="content" />
				</div>
			</section>
		</section>
	)
}

export default CompanyPage
