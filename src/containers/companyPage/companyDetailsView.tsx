import { Info, Warning } from "@mui/icons-material"
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
import { hasRoles } from "../../utils/rightsUtil"
import { TYPE_COMPANY_OPTIONS } from "../companyDetailsPage/constants"

interface CompanyDetailsViewProps {
	company: Company | null
	onClose?: any
}
function CompanyDetailsView({ company, onClose }: CompanyDetailsViewProps) {
	const { user, userRoles } = useContext(UserContext)

	const queryClient = useQueryClient()
	const apiAppliedCompanies = useQuery(
		"appliedCompanies",
		() => userService.getAppliedCompanies(),
		{
			enabled:
				user !== null &&
				userRoles.length > 0 &&
				!hasRoles([Role.ADMIN], userRoles),
		}
	)

	const postApply = useMutation(
		(companyId: number) => companyService.apply(companyId),
		{
			onSuccess: (data, variables) => {
				Swal.fire({
					position: "center",
					title: "Comment faire ma demande?",
					width: "w-[38em]",
					html:
						`Pour présenter votre demande de stage à <b class="text-primary">${company?.name}</b>, envoyez votre CV et lettre de motivation :` +
						`
						<ul class="text-left ml-8 pt-1 pb-1"> 
							<li> <i>➔ Par mail</i> : ${company?.contactMail}</li> 
							<li>
								<i>➔ Par courrier</i> : ${company?.address},
								${company?.city?.postalCode}  ${company?.city?.name}
							</li>
							<li>
								<i>➔ Sur place</i> :  ${company?.address},
							${company?.city?.postalCode}  ${company?.city?.name}
							</li> 
						</ul>` +
						`<span class="text-sm">Ps : Ces informations vous seront envoyées par mail. Vérifiez vos spams ou courriers indésirables. </span>`,

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
					<header>
						{onClose && (
							<span
								className="company-details-container--close"
								onClick={onClose}
							>
								<CancelIcon fontSize="inherit" />
							</span>
						)}
						<span className="text-xl mb-1 text-primary font-bold">
							{company.name}
						</span>
						<span>{company.address}</span>
						<span>
							{company.city?.postalCode} {company.city?.name}
							{company.type === TYPE_COMPANY_OPTIONS[2].value &&
								company?.department &&
								`, ${company?.department}`}
							{company.type === TYPE_COMPANY_OPTIONS[2].value &&
								company?.region &&
								`, ${company?.region}`}
						</span>
						<HasRight roles={[Role.USER]}>
							{apiAppliedCompanies.data?.includes(company.id) ? (
								<span className="mt-2 mb-1 text-info  p-1">
									<Info className="pb-1 mr-1" />
									Votre demande est enregistrée !
								</span>
							) : (
								<Button
									className="mt-2 mb-1 w-64"
									onClick={() => postApply.mutate(company.id)}
								>
									Comment faire ma demande
								</Button>
							)}
						</HasRight>
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
								{!company.minorAccepted && (
									<>
										➔
										<Warning className="pr-1 pb-1" />
										<span>
											Seulement des personnes majeurs
										</span>{" "}
									</>
								)}
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
						{apiAppliedCompanies.data?.includes(company.id) ? (
							<>
								{(company.contactLastName ||
									company.contactFirstName ||
									company.contactMail ||
									company.contactNum ||
									company.fixContactNum) && (
									<b className="text-lg mt-4">Contact :</b>
								)}
								{(company.contactLastName ||
									company.contactFirstName) && (
									<span className="pl-1 flex items-center">
										<PersonIcon className="pr-2" />
										{company.contactLastName?.toLocaleUpperCase()}{" "}
										{company.contactFirstName}
									</span>
								)}
								{company.contactMail && (
									<span className="pl-1  flex items-center">
										<ContactMailIcon className="pr-2" />
										{company.contactMail}
									</span>
								)}
								{company.contactNum && (
									<span className="pl-1  flex items-center">
										<ContactPhoneIcon className="pr-2" />
										{company.contactNum}
									</span>
								)}
								{company.fixContactNum && (
									<span className="pl-1  flex items-center">
										<ContactPhoneIcon className="pr-2" />
										{company.fixContactNum}
									</span>
								)}
							</>
						) : (
							""
						)}
					</div>
				</div>
			)}
		</section>
	)
}

export default CompanyDetailsView
