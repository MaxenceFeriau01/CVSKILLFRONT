import { INavLink, NAV_LINK_ARRAY } from "../../utils/constants"
import SidebarLink from "./sidebarLink"

interface SidebarProps {
	showSidebar: boolean
	setShowSidebar: any
}

function Sidebar({ showSidebar, setShowSidebar }: SidebarProps) {
	return (
		<div className={`sidebar ${showSidebar ? "" : "sidebar--closed"}`}>
			<div className="sidebar-header" />
			{NAV_LINK_ARRAY.map((nav: INavLink) => (
				<SidebarLink
					onClick={setShowSidebar}
					key={nav.url}
					url={nav.url}
					text={nav.text}
					Icon={nav.Icon}
					roles={nav.roles}
				/>
			))}
		</div>
	)
}
export default Sidebar
