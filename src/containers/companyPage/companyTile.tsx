import PhotoIcon from "@mui/icons-material/Photo"
import { Link } from "react-router-dom"
import Company from "../../apis/models/company"

interface CompanyProps {
	company: Company
}
function CompanyTile({ company }: CompanyProps) {
	return (
		<Link to={`/company-details/${company.id}`} className="company-tile">
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
						{index !== company.activities.length - 1 ? ", " : ""}
					</span>
				))}
			</div>
			<span className="company-tile__postal">{company.siret}</span>
		</Link>
	)
}

export default CompanyTile
