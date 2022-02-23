import BusinessIcon from "@mui/icons-material/Business"

import { useContext } from "react"
import SidebarLink from "./sidebarLink"
import ShowSidebarContext from "../../contexts/showSidebar"

function Sidebar() {
	const { showSidebar } = useContext(ShowSidebarContext)
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
