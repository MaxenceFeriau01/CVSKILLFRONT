import HomeIcon from "@mui/icons-material/Home"
import MenuIcon from "@mui/icons-material/Menu"
import { useContext, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import ShowSidebarContext from "../../contexts/showSidebar"
import UserContext from "../../contexts/user"
import UserPopover from "./userPopover"
import useOutsideClick from "../../hooks/outsideClick"

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
				return "Les entreprises qui acceuillent"
			case "/new-company":
				return "Détails d'une entreprise"
			default:
				if (location.pathname.includes("/company-details/"))
					return "Détails d'une entreprise"
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
				<HomeIcon className="header__svg--home" />
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
