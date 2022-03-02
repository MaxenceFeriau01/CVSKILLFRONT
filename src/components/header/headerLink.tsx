import { NavLink } from "react-router-dom"

interface HeaderLinkProps {
	text: string
	Icon: any
	url: string
}

function HeaderLink({ text, Icon, url }: HeaderLinkProps) {
	return (
		<NavLink className="header-link" to={url}>
			<Icon fontSize="inherit" />
			<span>{text}</span>
		</NavLink>
	)
}
export default HeaderLink
