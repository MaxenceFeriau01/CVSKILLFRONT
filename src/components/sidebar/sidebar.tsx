import { INavLink, NAV_LINK_ARRAY } from "../../utils/constants"
import SidebarLink from "./sidebarLink"

interface SidebarProps {
	showSidebar: boolean
	setShowSidebar: any
	refSidebar: any
}

function Sidebar({ showSidebar, setShowSidebar, refSidebar }: SidebarProps) {
	return (
		<div
			className={`sidebar ${
				showSidebar ? "sidebar--active" : "sidebar--closed"
			}`}
			ref={refSidebar}
		>
			<div className="sidebar-header" />
			{NAV_LINK_ARRAY.map((nav: INavLink) => (
				<SidebarLink
					onClick={setShowSidebar}
					key={nav.url}
					url={nav.url}
					text={nav.text}
					Icon={nav.Icon}
					roles={nav.roles}
					subMenu={nav.subMenu}
				/>
			))}
		</div>
	)
}
export default Sidebar
