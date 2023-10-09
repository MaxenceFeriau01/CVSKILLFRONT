import { useContext } from "react"

import Company from "../../api/models/company"

import ReactSelectOption from "../../api/models/reactSelectOption"

import CustomSelect from "../../components/inputs/customSelect"
import CompanyTile from "./companyTile"

import UserContext from "../../contexts/user"
import useActivitiesQuery from "../../hooks/useActivitiesQuery"
import useJobsQuery from "../../hooks/useJobsQuery"
import useStatusesQuery from "../../hooks/useStatusesQuery"
import CompanyDetailsView from "./companyDetailsView"
import useCompaniesInfiniteQuery from "./hooks/useCompaniesInfiniteQuery"
import useSelectedCompany from "./hooks/useSelectedCompany"
import useAddVisits from "./hooks/useAddVisits"
import useProfilePopup from "./hooks/useProfilePopup"

function CompanyPage() {
	const { user } = useContext(UserContext)
	const { statuses } = useStatusesQuery()
	const { activities } = useActivitiesQuery()
	const { jobs } = useJobsQuery()

	const { selectedCompany, setSelectedCompany, onSelectCompany } =
		useSelectedCompany()

	const {
		companiesInfiniteQuery,
		handleScroll,
		setActivityFilter,
		setStatusFilter,
		setJobsFilter,
		selectedStatusFilter,
		selectedActivities,
		selectedJobs,
	} = useCompaniesInfiniteQuery(setSelectedCompany)

	// Increment visit for statistics (anonymous count)
	useAddVisits()

	// Show an alert every 3 months to invite user to update his profile
	useProfilePopup()

	return (
		<section className="page company-page">
			{user && user.token && (
				<header className="company-page-header">
					<CustomSelect
						className="w-10/12 pt-1 tablet:w-[30%] z-30"
						placeholder="Par domaine(s)"
						options={activities.data}
						isMulti
						onChange={(e: ReactSelectOption[]) =>
							setActivityFilter(e)
						}
						value={activities?.data?.filter(
							(option: ReactSelectOption) =>
								selectedActivities?.includes(+option.value)
						)}
						isClearable
						isSearchable
						name="selectActivity"
					/>
					<CustomSelect
						className="w-10/12 pt-1 tablet:w-[30%] z-20"
						placeholder="Par métier(s)"
						options={jobs.data}
						isMulti
						value={jobs?.data?.filter((option: ReactSelectOption) =>
							selectedJobs?.includes(+option.value)
						)}
						onChange={(e: ReactSelectOption[]) => setJobsFilter(e)}
						isClearable
						isSearchable
						name="selectJob"
					/>

					<CustomSelect
						className="w-10/12 pt-1 tablet:w-[30%] z-10"
						placeholder="Par statut recherché"
						options={statuses?.data}
						value={statuses?.data?.find(
							(c: ReactSelectOption) =>
								c.value === selectedStatusFilter
						)}
						onChange={(e: ReactSelectOption) => setStatusFilter(e)}
						isClearable
						isSearchable
						name="selectTrainees"
					/>
				</header>
			)}

			<section
				className={`content company-container ${
					user && user.token ? "" : "!max-h-full"
				}`}
			>
				<div
					className={`company-list-content ${
						selectedCompany ? "tablet:w-1/2" : ""
					}`}
					onScroll={handleScroll}
				>
					{companiesInfiniteQuery?.data?.pages?.map(page =>
						page.totalElements > 0 ? (
							page?.content?.map((c: Company) => (
								<CompanyTile
									selectedCompanyId={selectedCompany?.id}
									key={c.id}
									company={c}
									onClick={(company: Company) =>
										onSelectCompany(company)
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
