import { NavLink } from "react-router-dom"
import { INavLink } from "../../utils/constants"

function HeaderLink({ text, Icon, url }: INavLink) {
	return (
		<NavLink className="header-link" to={url}>
			<Icon fontSize="inherit" />
			<span>{text}</span>
		</NavLink>
	)
}
export default HeaderLink
