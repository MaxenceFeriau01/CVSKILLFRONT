import { useContext, useRef, useState } from "react"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import UserContext from "../../contexts/user"
import UserPopover from "./userPopover"
import useOutsideClick from "../../hooks/outsideClick"
import dkStageLogo from "../../resources/images/dk-stage-logo.png"
import HeaderLink from "./headerLink"
import Sidebar from "../sidebar/sidebar"
import { INavLink, NAV_LINK_ARRAY } from "../../utils/constants"

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
					{NAV_LINK_ARRAY.map((nav: INavLink) => (
						<HeaderLink
							url={nav.url}
							text={nav.text}
							Icon={nav.Icon}
						/>
					))}
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
