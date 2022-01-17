import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import PhotoIcon from "@mui/icons-material/Photo"
import Company from "../../apis/models/company"

interface CompanyProps {
	company: Company
}
function CompanyTile({ company }: CompanyProps) {
	return (
		<Link className="company-tile" to={`/company-details/${company.id}`}>
			<div className="company-tile__image">
				{company.logo ? "" : <PhotoIcon />}
			</div>
			<h4>{company.name}</h4>
			<div>
				{company.activities.length > 0 && <b>activitées : </b>}
				{company.activities.map((activity, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<span key={index}>
						{activity.name}
						{index !== company.activities.length - 1 ? ", " : ""}
					</span>
				))}
			</div>

			<Box sx={{ mb: 1, mt: 1 }}>{company.siret}</Box>
			<div className="company-tile__contact ">
				<span>{company.contactMail}</span>
				<span>{company.contactNum}</span>
			</div>
		</Link>
	)
}

export default CompanyTile
