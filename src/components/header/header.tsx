import LoginIcon from "@mui/icons-material/Login"
import MenuIcon from "@mui/icons-material/Menu"
import { useContext, useRef, useState } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/user"
import Role from "../../enums/Role"
import useOutsideClick from "../../hooks/outsideClick"
import dkStageLogo from "../../resources/images/dk-stage-logo.png"
import { INavLink, NAV_LINK_ARRAY } from "../../utils/constants"
import HasRight from "../rights/hasRight"
import Sidebar from "../sidebar/sidebar"
import HeaderLink from "./headerLink"
import UserPopover from "./userPopover"

function Header() {
	const [showSidebar, setShowSidebar] = useState<boolean>(false)
	const [showUserPopover, setShowUserPopover] = useState<boolean>(false)
	const { user } = useContext(UserContext)
	const refPopover: any = useRef()

	useOutsideClick(refPopover, () => setShowUserPopover(false))

	function toggleSideBar() {
		setShowSidebar(!showSidebar)
	}

	return (
		<>
			<Sidebar
				showSidebar={showSidebar}
				setShowSidebar={() => setShowSidebar(false)}
			/>
			<div className="header">
				<HasRight roles={[Role.ADMIN, Role.USER]}>
					<MenuIcon
						onClick={() => toggleSideBar()}
						className="header__svg--menu"
					/>
				</HasRight>
				<Link className="header-home" to="/companies">
					<img
						className="header--home"
						src={dkStageLogo}
						alt="logo"
						width="136"
						height="38"
					/>
				</Link>

				<div className="header-nav">
					{NAV_LINK_ARRAY.map((nav: INavLink) => (
						<HeaderLink
							key={nav.url}
							url={nav.url}
							text={nav.text}
							Icon={nav.Icon}
							roles={nav.roles}
							subMenu={nav.subMenu}
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
