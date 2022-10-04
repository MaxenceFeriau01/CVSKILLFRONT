import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import Company from "../../../api/models/company"
import UserContext from "../../../contexts/user"

interface useSelectedCompanyType {
	selectedCompany: Company | null
	setSelectedCompany(company: Company | null): void
	onSelectCompany(company: Company | null): void
}

function useSelectedCompany(): useSelectedCompanyType {
	const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
	const { user } = useContext(UserContext)
	const navigate = useNavigate()

	function onSelectCompany(company: Company) {
		if (user && user.token) {
			setSelectedCompany(company)
		} else {
			Swal.fire({
				title: "<strong>Non <u>connecté(e)</u>?</strong>",
				icon: "info",
				html:
					"Vous devez vous <b>connecter</b>, " +
					"pour profiter de l'ensemble des fonctionnalités.",
				showCloseButton: true,
				showDenyButton: true,
				focusConfirm: false,
				confirmButtonText: "Connexion",
				denyButtonText: "Inscription",
				denyButtonColor: "#2daf8e",
			}).then(result => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					navigate("/login")
				} else if (result.isDenied) {
					navigate("/registration")
				}
			})
		}
	}

	return { selectedCompany, setSelectedCompany, onSelectCompany }
}

export default useSelectedCompany
