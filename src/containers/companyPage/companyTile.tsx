import { Box } from "@mui/material"
import Company from "../../apis/models/company"

interface CompanyProps {
	company: Company
}
function CompanyTile({ company }: CompanyProps) {
	return (
		<div className="company-tile">
			<h4>{company.name}</h4>
			<Box sx={{ display: "flex", mb: 1 }}>
				{company.activities.length > 0 && <b>activitées : </b>}
				{company.activities.map((activity, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<span key={index}>
						{activity.name}
						{index !== company.activities.length - 1 ? ", " : ""}
					</span>
				))}
			</Box>
			<Box sx={{ mb: 1 }}>{company.siret}</Box>
			<div className="company-tile__contact ">
				<span>{company.contactMail}</span>
				<span>{company.contactNum}</span>
			</div>
		</div>
	)
}

export default CompanyTile
