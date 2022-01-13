import HomeIcon from "@mui/icons-material//Home"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import BusinessIcon from "@mui/icons-material/Business"
import WorkIcon from "@mui/icons-material/Work"
import { useContext } from "react"
import SidebarLink from "./sidebarLink"
import ShowSidebarContext from "../../contexts/showSidebar"

function Sidebar() {
	const { showSidebar } = useContext(ShowSidebarContext)
	return (
		<div className={`sidebar ${showSidebar ? "" : "sidebar--closed"}`}>
			<SidebarLink url="/" text="Home" Icon={HomeIcon} />
			<SidebarLink
				url="/companies"
				text="Entreprises"
				Icon={BusinessIcon}
			/>
			<SidebarLink
				url="/interns"
				text="Stagiaires"
				Icon={DirectionsRunIcon}
			/>
			<SidebarLink url="/jobs" text="Jobs" Icon={WorkIcon} />
		</div>
	)
}
export default Sidebar
