import { Link } from "react-router-dom"
import forbidden from "../../resources/images/forbidden.svg"

function ForbiddenPage() {
	return (
		<section className="forbidden">
			<img src={forbidden} alt="Forbidden" />
			<div>
				<span className="forbidden-info">
					Vous ne pouvez pas accéder à cette page !
				</span>
				<br />
				<span>
					Reprenez votre activité en{" "}
					<Link className="link-company" to="/company">
						cliquant ici.
					</Link>
				</span>
			</div>
		</section>
	)
}

export default ForbiddenPage
