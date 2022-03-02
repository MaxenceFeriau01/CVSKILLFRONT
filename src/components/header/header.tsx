import MenuIcon from "@mui/icons-material/Menu"
import { useContext, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import ShowSidebarContext from "../../contexts/showSidebar"
import UserContext from "../../contexts/user"
import UserPopover from "./userPopover"
import useOutsideClick from "../../hooks/outsideClick"
import dkStageLogo from "../../resources/images/dk_stage_logo.png"

function Header() {
	const { showSidebar, setShowSidebar } = useContext(ShowSidebarContext)
	const [showUserPopover, setShowUserPopover] = useState(false)
	const { user } = useContext(UserContext)
	const refPopover: any = useRef()
	const location = useLocation()

	useOutsideClick(refPopover, () => setShowUserPopover(false))

	function toggleSideBar() {
		setShowSidebar(!showSidebar)
	}

	function titleByUrl(): string {
		switch (location.pathname) {
			case "/companies":
				return "Les entreprises"
			case "/new-company":
				return "Création d'une entreprise"
			case "/my-profile":
				return "Mon profil"
			default:
				if (location.pathname.includes("/company-details/"))
					return "L'entreprise qui acceuille"
				return ""
		}
	}

	return (
		<div className="header">
			<MenuIcon
				onClick={() => toggleSideBar()}
				className="header__svg--menu"
			/>
			<Link to="/companies">
				<img className="header--home" src={dkStageLogo} alt="logo" />
			</Link>

			<span className="header__title">{titleByUrl()}</span>
			{user ? (
				<div
					ref={refPopover}
					className="header__user"
					onClick={() => setShowUserPopover(!showUserPopover)}
				>
					{user.firstName.substring(0, 1) + user.name.substring(0, 1)}
					{showUserPopover && <UserPopover />}
				</div>
			) : (
				<Link className="header__svg--login" to="/login">
					<LoginIcon /> Connexion
				</Link>
			)}
		</div>
	)
}
export default Header
