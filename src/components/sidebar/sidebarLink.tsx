import { NavLink } from "react-router-dom"

interface SidebarLinkProps {
	text: string
	Icon: any
	url: string
}

function SidebarLink({ text, Icon, url }: SidebarLinkProps) {
	return (
		<NavLink className="link" to={url}>
			<Icon />
			<h2>{text}</h2>
		</NavLink>
	)
}
export default SidebarLink
