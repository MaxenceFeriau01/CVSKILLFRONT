import { NavLink } from "react-router-dom"
import { INavLink } from "../../utils/constants"

function SidebarLink({ text, Icon, url }: INavLink) {
	return (
		<NavLink className="link" to={url}>
			<Icon />
			<h2>{text}</h2>
		</NavLink>
	)
}
export default SidebarLink
