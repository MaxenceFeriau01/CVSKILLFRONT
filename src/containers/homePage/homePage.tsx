import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import useHideElement from "../../hooks/hideElement"
import logo from "../../resources/images/logo.svg"
import internship from "../../resources/images/internship.svg"
import working from "../../resources/images/working.svg"

function HomePage() {
	useHideElement(["header", "footer"])
	const navigate = useNavigate()

	function goToInternShip() {
		navigate("/companies")
	}

	function goToCompanies() {
		navigate("/login")
	}

	return (
		<section className="home">
			<img
				className="home__logo"
				src={logo}
				alt="Entreprendre ensemble"
			/>
			<div className="home__action__container">
				<div className="action-call-container">
					<img src={working} alt="Internship" />
					<h2>Entreprises</h2>
					<p>
						Je suis une entreprise et je cherche de nouveaux
						stagiaires motivées !
					</p>
					<Button onClick={() => goToCompanies()}>
						C'est parti !
					</Button>
				</div>
				<div className="action-call-container">
					<img src={internship} alt="Internship" />
					<h2>Stagiaires</h2>
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
