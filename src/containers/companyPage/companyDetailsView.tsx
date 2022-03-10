import { Button } from "@mui/material"
import ContactMailIcon from "@mui/icons-material/ContactMail"
import PersonIcon from "@mui/icons-material/Person"
import ContactPhoneIcon from "@mui/icons-material/ContactPhone"
import EuroIcon from "@mui/icons-material/Euro"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CancelIcon from "@mui/icons-material/Cancel"
import Company from "../../api/models/company"

interface CompanyDetailsViewProps {
	company: Company | null
	onClose: any
}
function CompanyDetailsView({ company, onClose }: CompanyDetailsViewProps) {
	return (
		<section
			className={`${
				company ? "company-details-container" : "w-0 invisible"
			}`}
		>
			{company && (
				<div className="company-details-container-view">
					<span
						className="company-details-container--close"
						onClick={onClose}
					>
						<CancelIcon fontSize="inherit" />
					</span>
					<header>
						<span className="text-xl mb-1 text-primary font-bold">
							{company.name}
						</span>

						<span>{company.address}</span>
						<span>
							{company.postalCode}, {company.town}
						</span>
						<span className="mt-2">
							<b>Type : </b>
							{company.type}
						</span>
						<span>
							<b>Siret : </b>
							{company.siret}
						</span>

						<Button className="mt-2 mb-1 w-48" onClick={() => {}}>
							Demander un stage
						</Button>
					</header>
					<div className="company-details-container-view-content">
						<p className="mb-2">{company?.description}</p>

						{company.activities.length > 0 && (
							<span>
								<u>Domaine d'activitées</u> :{" "}
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
						<span className="pl-1 flex items-center">
							<EuroIcon className="pr-2" />
							Rémunéré
						</span>
						<span className="pl-1 items-center">
							<AccessTimeIcon className="pr-2" />
							Longue durée
						</span>
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
								<li>
									➔ des{" "}
									<b>{internType?.internStatus?.name}s</b> :{" "}
									<i>{internType?.period}</i>
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
					</div>
				</div>
			)}
		</section>
	)
}

export default CompanyDetailsView
