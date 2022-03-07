import { INavLink, NAV_LINK_ARRAY } from "../../utils/constants"
import SidebarLink from "./sidebarLink"

interface SidebarProps {
	showSidebar: boolean
}

function Sidebar({ showSidebar }: SidebarProps) {
	return (
		<div className={`sidebar ${showSidebar ? "" : "sidebar--closed"}`}>
			<div className="sidebar-header" />
			{NAV_LINK_ARRAY.map((nav: INavLink) => (
				<SidebarLink url={nav.url} text={nav.text} Icon={nav.Icon} />
			))}
		</div>
	)
}
export default Sidebar
