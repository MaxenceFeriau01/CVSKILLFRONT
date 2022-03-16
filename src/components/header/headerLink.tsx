import { NavLink } from "react-router-dom"
import { INavLink } from "../../utils/constants"
import HasRight from "../rights/hasRight"

function HeaderLink({ text, Icon, url, roles }: INavLink) {
	return (
		<HasRight roles={roles}>
			<NavLink className="header-link" to={url}>
				<Icon fontSize="inherit" />
				<span>{text}</span>
			</NavLink>
		</HasRight>
	)
}
export default HeaderLink
