import MenuIcon from "@mui/icons-material/Menu"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"

import { useContext, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import BusinessIcon from "@mui/icons-material/Business"
import UserContext from "../../contexts/user"
import UserPopover from "./userPopover"
import useOutsideClick from "../../hooks/outsideClick"
import dkStageLogo from "../../resources/images/dk_stage_logo.png"
import HeaderLink from "./headerLink"
import Sidebar from "../sidebar/sidebar"

function Header() {
	const [showSidebar, setShowSidebar] = useState<boolean>(false)
	const [showUserPopover, setShowUserPopover] = useState(false)
	const { user } = useContext(UserContext)
	const refPopover: any = useRef()

	useOutsideClick(refPopover, () => setShowUserPopover(false))

	function toggleSideBar() {
		setShowSidebar(!showSidebar)
	}

	return (
		<>
			<Sidebar showSidebar={showSidebar} />
			<div className="header">
				<MenuIcon
					onClick={() => toggleSideBar()}
					className="header__svg--menu"
				/>
				<Link className="header-home" to="/companies">
					<img
						className="header--home"
						src={dkStageLogo}
						alt="logo"
					/>
				</Link>

				<div className="header-nav">
					<HeaderLink
						url="/companies"
						text="Entreprises"
						Icon={BusinessIcon}
					/>

					<HeaderLink
						url="/admin"
						text="Administration"
						Icon={AdminPanelSettingsIcon}
					/>
				</div>
				{user ? (
					<div
						ref={refPopover}
						className="header__user"
						onClick={() => setShowUserPopover(!showUserPopover)}
					>
						{user.firstName.substring(0, 1) +
							user.name.substring(0, 1)}
						{showUserPopover && <UserPopover />}
					</div>
				) : (
					<Link className="header__svg--login" to="/login">
						<LoginIcon /> Connexion
					</Link>
				)}
			</div>
		</>
	)
}
export default Header
