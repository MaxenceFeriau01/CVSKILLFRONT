import PhotoIcon from "@mui/icons-material/Photo"
import ReactCardFlip from "react-card-flip"
import { useState } from "react"
import Company from "../../apis/models/company"

interface CompanyProps {
	company: Company
}
function CompanyTile({ company }: CompanyProps) {
	const [isFlipped, setIsFlipped] = useState(false)
	return (
		<ReactCardFlip
			containerClassName="company-flip-card"
			isFlipped={isFlipped}
			flipDirection="vertical"
		>
			<div
				className="company-tile"
				onClick={() => setIsFlipped(!isFlipped)}
			>
				<div className="company-tile__image">
					{company.logo ? (
						<img
							alt="Logo"
							src={`data:image/png;base64,${company.logo}`}
						/>
					) : (
						<PhotoIcon />
					)}
				</div>
				<h4>{company!.name}</h4>
				<div>
					{company.activities?.length > 0 && <b>activité(s) : </b>}
					{company.activities?.map((activity, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<span key={index}>
							{activity.name}
							{index !== company.activities.length - 1
								? ", "
								: ""}
						</span>
					))}
				</div>
				<span className="company-tile__siret">{company.siret}</span>
			</div>

			<div
				className="company-tile"
				onClick={() => setIsFlipped(!isFlipped)}
			>
				<h4>{company.name}</h4>
				<p>{company.description}</p>
				<div className="company-tile__contact">
					<span>
						{company.contactLastName} {company.contactFirstName}
					</span>
					<span>{company.contactMail}</span>
					<span>{company.contactNum}</span>
				</div>
			</div>
		</ReactCardFlip>
	)
}

export default CompanyTile
