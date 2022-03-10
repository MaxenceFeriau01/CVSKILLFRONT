import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useContext } from "react"
import UserContext from "../../contexts/user"
import Company from "../../api/models/company"
import imageUpload from "../../resources/images/image-upload.svg"

interface CompanyProps {
	company: Company
}
function CompanyTile({ company }: CompanyProps) {
	const navigate = useNavigate()

	const { user } = useContext(UserContext)

	function onClick() {
		if (user && user.token) {
			navigate(`/company-details/${company.id}`)
		} else {
			Swal.fire({
				title: "<strong>Non <u>connecté(e)</u>?</strong>",
				icon: "info",
				html:
					"Vous devez vous <b>connecter</b>, " +
					"pour profiter de l'ensemble des fonctionnalités.",
				showCloseButton: true,
				focusConfirm: false,
				confirmButtonText: "Se connecter !",
			}).then(result => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					navigate("/login", {
						state: `/company-details/${company.id}`,
					})
				}
			})
		}
	}

	return (
		<div onClick={() => onClick()} className="company-tile">
			{company.paidAndLongTermInternship ? (<div className="company-tile__clock" title="Stage de longue durée, rémunérée">
				<AccessTimeIcon />	
			</div>) : ''}
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
			<span className="company-tile__postal"><b>{company.town} ({company.postalCode})</b></span>
		</div>
	)
}

export default CompanyTile
