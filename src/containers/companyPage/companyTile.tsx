import Company from "../../api/models/company"
import imageUpload from "../../resources/images/image-upload.svg"

interface CompanyProps {
	company: Company
	onClick: any
}
function CompanyTile({ company, onClick }: CompanyProps) {
	return (
		<div onClick={() => onClick(company)} className="company-tile">
			<div className="company-tile__image">
				{company.logo ? (
					<img
						alt="Logo"
						src={`data:image/png;base64,${company.logo}`}
					/>
				) : (
					<img src={imageUpload} alt="Default" />
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
		</div>
	)
}

export default CompanyTile
