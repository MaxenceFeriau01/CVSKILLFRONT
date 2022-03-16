import { NavLink } from "react-router-dom"
import { INavLink } from "../../utils/constants"
import HasRight from "../rights/hasRight"

function SidebarLink({ text, Icon, url, roles, onClick }: INavLink) {
	return (
		<HasRight roles={roles}>
			<NavLink className="link" to={url} onClick={onClick}>
				<Icon />
				<h2>{text}</h2>
			</NavLink>
		</HasRight>
	)
}
export default SidebarLink
