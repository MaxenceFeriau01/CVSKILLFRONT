import { NavLink } from "react-router-dom"
import { INavLink } from "../../utils/constants"
import HasRight from '../rights/hasRight';

function HeaderLink({ text, Icon, url, role }: INavLink) {
	return (
		<HasRight roles={[role]}>
			<NavLink className="header-link" to={url}>
				<Icon fontSize="inherit" />
				<span>{text}</span>
			</NavLink>
		</HasRight>
	)
}
export default HeaderLink
