import AccessTimeIcon from "@mui/icons-material/AccessTime"
import Company from "../../api/models/company"
import imageUpload from "../../resources/images/image-upload.svg"

interface CompanyProps {
	company: Company
	onClick: any
	selectedCompanyId: number | undefined
}
function CompanyTile({ company, onClick, selectedCompanyId }: CompanyProps) {
	return (
		<div
			onClick={() => onClick(company)}
			className={`company-tile ${selectedCompanyId ? "w-full" : ""}${
				selectedCompanyId === company?.id
					? " company-tile--selected"
					: ""
			}`}
		>
			{company.paidAndLongTermInternship ? (
				<div
					className="company-tile__clock"
					title="Stage de longue durée, rémunérée"
				>
					<AccessTimeIcon />
				</div>
			) : (
				""
			)}

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
			<div className="overflow-hidden w-5/6">
				{company.activities?.length > 0 && <b>activité(s) : </b>}
				{company.activities?.map((activity, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<span key={index}>
						{activity.name}
						{index !== company.activities.length - 1 ? ", " : ""}
					</span>
				))}
			</div>
			<span className="company-tile__postal">
				<b>
					{company.town} ({company.postalCode})
				</b>
			</span>
		</div>
	)
}

export default CompanyTile
