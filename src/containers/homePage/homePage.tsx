import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.svg"
import internship from "../../resources/images/internship.svg"
import working from "../../resources/images/working.svg"
import ContactDialog from "../../components/contactDialog"

function HomePage() {
	useHideElement(["header", "footer"])
	const navigate = useNavigate()
	const [openContactDialog, setContactDialog] = useState<boolean>(false)

	function goToInternShip() {
		navigate("/companies")
	}

	return (
		<section className="home">
			<img
				className="home__logo"
				src={logo}
				alt="Entreprendre ensemble"
				width="300"
				height="90"
			/>
			<div className="home__action__container">
				<div className="action-call-container">
					<img
						src={working}
						alt="Internship"
						width="72"
						height="72"
					/>
					<h2 className="text-2xl text-secondary font-bold">
						Entreprises
					</h2>
					<p>
						Je suis une entreprise et je cherche de nouveaux
						stagiaires motivés !
					</p>
					<Button onClick={() => setContactDialog(true)}>
						C'est parti !
					</Button>
					<ContactDialog
						isOpen={openContactDialog}
						closeModal={() => setContactDialog(false)}
					/>
				</div>
				<div className="action-call-container">
					<img
						src={internship}
						alt="Internship"
						width="72"
						height="72"
					/>
					<h2 className="text-2xl text-secondary font-bold">
						Stagiaires
					</h2>
					<p>
						Je suis à la recherche d'un stage afin de découvrir de
						nouvelles compétences !
					</p>
					<Button onClick={() => goToInternShip()}>
						C'est parti !
					</Button>
				</div>
			</div>
			<a href="https://storyset.com/people">
				People illustrations by Storyset
			</a>
		</section>
	)
}

export default HomePage
