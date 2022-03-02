import BusinessIcon from "@mui/icons-material/Business"

import SidebarLink from "./sidebarLink"

interface SidebarProps {
	showSidebar: boolean
}

function Sidebar({ showSidebar }: SidebarProps) {
	return (
		<div className={`sidebar ${showSidebar ? "" : "sidebar--closed"}`}>
			<div className="sidebar-header" />
			<SidebarLink
				url="/companies"
				text="Entreprises"
				Icon={BusinessIcon}
			/>
		</div>
	)
}
export default Sidebar
