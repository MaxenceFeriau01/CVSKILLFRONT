import HomeIcon from "@mui/icons-material/Home"
import MenuIcon from "@mui/icons-material/Menu"
import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import ShowSidebarContext from "../../contexts/showSidebar"

function Header() {
	const { showSidebar, setShowSidebar } = useContext(ShowSidebarContext)
	const location = useLocation()

	function toggleSideBar() {
		setShowSidebar(!showSidebar)
	}

	function titleByUrl(): string {
		switch (location.pathname) {
			case "/":
				return "Les entreprises qui acceuillent"
			case "/new-company":
				return "Détails d'une entreprise"
			default:
				return ""
		}
	}
	return (
		<div className="header">
			<MenuIcon
				onClick={() => toggleSideBar()}
				className="header__svg--menu"
			/>
			<Link to="/">
				<HomeIcon className="header__svg--home" />
			</Link>
			<span className="header__title">{titleByUrl()}</span>
			<Link className="header__svg--login" to="/login">
				<LoginIcon /> Connexion
			</Link>
		</div>
	)
}
export default Header
