import { Info } from "@mui/icons-material"
import CancelIcon from "@mui/icons-material/Cancel"
import ContactMailIcon from "@mui/icons-material/ContactMail"
import ContactPhoneIcon from "@mui/icons-material/ContactPhone"
import PersonIcon from "@mui/icons-material/Person"
import { Button } from "@mui/material"
import { useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import Swal from "sweetalert2"
import Company from "../../api/models/company"
import companyService from "../../api/services/companyService"
import userService from "../../api/services/userService"
import HasRight from "../../components/rights/hasRight"
import UserContext from "../../contexts/user"
import Role from "../../enums/Role"
import { TYPE_COMPANY_OPTIONS } from "../companyDetailsPage/constants"
import { hasRoles } from "../../utils/rightsUtil"

interface CompanyDetailsViewProps {
	company: Company | null
	onClose?: any
}
function CompanyDetailsView({ company, onClose }: CompanyDetailsViewProps) {
	const { user } = useContext(UserContext)

	const queryClient = useQueryClient()
	const apiAppliedCompanies = useQuery(
		"appliedCompanies",
		() => userService.getAppliedCompanies(),
		{
			enabled:
				user !== null &&
				!hasRoles([Role.ADMIN], userService.getRoles()),
		}
	)

	const postApply = useMutation(
		(companyId: number) => companyService.apply(companyId),
		{
			onSuccess: (data, variables) => {
				Swal.fire({
					position: "bottom-end",
					title: "",
					text: "Votre demande a été prise en compte, vous allez être contacter par mail sous peu ! ",
					icon: "success",
				}).then(() =>
					queryClient.setQueryData(
						["appliedCompanies"],
						(old: any) => [...old, variables]
					)
				)
			},
		}
	)

	return (
		<section
			className={`${
				company ? "company-details-container" : "w-0 invisible"
			}`}
		>
			{company && (
				<div className="company-details-container-view">
					{onClose && (
						<span
							className="company-details-container--close"
							onClick={onClose}
						>
							<CancelIcon fontSize="inherit" />
						</span>
					)}

					<header>
						<span className="text-xl mb-1 text-primary font-bold">
							{company.name}
						</span>
						<span>{company.address}</span>
						<span>
							{company.postalCode}, {company.town}
							{company.type === TYPE_COMPANY_OPTIONS[2].value &&
								company?.department &&
								`, ${company?.department}`}
							{company.type === TYPE_COMPANY_OPTIONS[2].value &&
								company?.region &&
								`, ${company?.region}`}
						</span>
						<span className="mt-2">
							<b>Type : </b>
							{company.type}
						</span>
						{company.type === TYPE_COMPANY_OPTIONS[2].value &&
							company?.epci && (
								<span>
									<b>EPCI : </b>
									{company?.epci}
								</span>
							)}
						<span>
							<b>Siret : </b>
							{company.siret}
						</span>
						{company.websiteUrl && (
							<span>
								<b>Site web : </b>
								<a
									href={company.websiteUrl}
									target="_blank"
									rel="noreferrer"
								>
									{company.websiteUrl}
								</a>
							</span>
						)}
						<HasRight roles={[Role.USER]}>
							{apiAppliedCompanies.data?.includes(company.id) ? (
								<span className="mt-2 mb-1 text-info  p-1">
									<Info className="pb-1 mr-1" />
									Votre demande est prise en compte !
								</span>
							) : (
								<Button
									className="mt-2 mb-1 w-48"
									onClick={() => postApply.mutate(company.id)}
								>
									Demander un stage
								</Button>
							)}
						</HasRight>
					</header>
					<div className="company-details-container-view-content">
						<p className="mb-2">{company?.description}</p>

						{company.activities.length > 0 && (
							<span>
								<u>Domaine d'activités</u> :{" "}
								{company.activities.map((activity, index) => (
									// eslint-disable-next-line react/no-array-index-key
									<i key={index}>
										{activity.name}
										{index !== company.activities.length - 1
											? ", "
											: ""}
									</i>
								))}
							</span>
						)}
						<b className="text-lg mt-4">Recherche :</b>
						<ul className="pl-2">
							<li>
								➔ <b>{company.desiredInternsNumber} </b>
								stagiaires par an
							</li>
							<li>
								➔ Dans le(s) domaine(s) suivant(s) :{" "}
								{company.searchedActivities?.map(
									(activity, index) => (
										// eslint-disable-next-line react/no-array-index-key
										<i key={index}>
											{activity.name}
											{index !==
											company.searchedActivities.length -
												1
												? ", "
												: ""}
										</i>
									)
								)}
							</li>
							<li>
								➔ Dans le(s) métier(s) suivant(s) :{" "}
								{company.searchedJobs?.map((job, index) => (
									// eslint-disable-next-line react/no-array-index-key
									<i key={index}>
										{job.name}
										{index !==
										company.searchedJobs.length - 1
											? ", "
											: ""}
									</i>
								))}
							</li>
							{company.searchedInternsType?.map(internType => (
								<li key={internType.id}>
									➔ Des{" "}
									<b>{internType?.internStatus?.name}s</b> :{" "}
									<ul className="list-disc pl-8">
										{internType.periods.map(period => (
											<li key={period}>
												<i>{period}</i>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
						<b className="text-lg mt-4">Contact :</b>
						<span className="pl-1 flex items-center">
							<PersonIcon className="pr-2" />
							{company.contactLastName.toLocaleUpperCase()}{" "}
							{company.contactFirstName}
						</span>
						<span className="pl-1  flex items-center">
							<ContactMailIcon className="pr-2" />
							{company.contactMail}
						</span>
						<span className="pl-1  flex items-center">
							<ContactPhoneIcon className="pr-2" />
							{company.contactNum}
						</span>
						{company.fixContactNum && (
							<span className="pl-1  flex items-center">
								<ContactPhoneIcon className="pr-2" />
								{company.fixContactNum}
							</span>
						)}
					</div>
				</div>
			)}
		</section>
	)
}

export default CompanyDetailsView
